import * as Yup from 'yup';
import db from '../../database';
import Ativo from '../models/Ativo';
import Qualificacao from '../models/Qualificacao';
import ClienteAtivo from '../models/ClienteAtivo';
import ContaInterna from '../models/ContaInterna';
import LivroDeOferta from '../models/LivroDeOferta';
import ContaAtivo from '../models/ContaAtivo';
import Comissao from '../models/Comissao';

class CompraAtivoController {
  // Verificação de dados
  async store(req, res) {
    const schema = Yup.object().shape({
      quantidade: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação de dados, verifique e tente novamente!',
      });
    }

    // Verifia a qualificação do cliente.
    const { tipo, status } = await Qualificacao.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (tipo === 'Funcionario') {
      return res.status(400).json('Você não pode realizar essa operação');
    }

    if (status === 'Inativo') {
      return res.status(400).json({ message: 'Você ainda não está ativo!' });
    }

    // Verifica se existe o Ativo
    const ativo = await Ativo.findByPk(req.query.ativo_id, {
      attributes: ['nome_do_ativo', 'valor', 'quantidade_disponivel'],
    });

    const { quantidade } = req.body;
    const valorTotal = ativo.valor * quantidade;
    const quantidadeRestante =
      ativo.quantidade_disponivel - req.body.quantidade;
    const { ativo_id } = req.query;

    // Verificar se o CLIENTE tem saldo.
    const conta = await ContaInterna.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (conta.brl_saldo === 0 || conta.brl_saldo < valorTotal) {
      return res.status(400).json({ message: 'No founds.' });
    }

    // Deduz da conta o valor da ordem
    conta.brl_saldo -= valorTotal;

    // Execução da ordem em Trasaction
    const { brl_saldo, ativo_brl_saldo } = conta;

    const transaction = await db.connection.transaction();
    try {
      await Ativo.update(
        {
          quantidade_disponivel: quantidadeRestante,
        },
        {
          where: { id: ativo_id },
          transaction,
        }
      );
      // ATENCAO aqui
      const jaPossuiAtivo = await ClienteAtivo.findOne({
        where: { nome: ativo.nome_do_ativo },
        transaction,
      });

      if (!jaPossuiAtivo) {
        await ClienteAtivo.create(
          {
            nome: ativo.nome_do_ativo,
            valor: Number(valorTotal),
            quantidade,
            usuario_id: req.usuarioId,
          },
          { transaction }
        );
      } else {
        await ClienteAtivo.update(
          {
            valor: jaPossuiAtivo.valor + valorTotal,
            quantidade: jaPossuiAtivo.quantidade + quantidade,
          },
          { where: { id: jaPossuiAtivo.id }, transaction }
        );
      }

      // Atualizar o valor do ativo na conta do usuario
      await ContaInterna.update(
        {
          brl_saldo,
          ativo_brl_saldo,
        },
        {
          where: { id: ativo_id },
          transaction,
        }
      );
      await transaction.commit();
      return res.status(201).json('all good!');
    } catch (error) {
      await transaction.rollback();
      return res.status(401).json(error);
    }
  }

  async bind(req, res) {
    // Validação de dados
    const schema = Yup.object().shape({
      ordem_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({
        error: 'Erro na validação de dados, verifique e tente novamente!',
      });
    }

    // Valor total
    const { ordem_id } = req.query;

    const ordem = await LivroDeOferta.findByPk(ordem_id, {
      attributes: [
        'id',
        'tipo_de_ordem',
        'preco_limite',
        'valor_total',
        'comissao',
        'quantidade',
        'status',
        'conta_interna_id',
      ],
    });

    // Verifica ordem venda
    if (!(ordem.tipo_de_ordem === 'Venda')) {
      return res.status(400).json({ message: 'Not possible!' });
    }

    // Verifica status
    if (ordem.status === 'Executada') {
      return res.status(400).json({ message: 'Ordem fechada' });
    }

    // Verica saldo
    const conta = await ContaInterna.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (conta.brl_saldo === 0 || conta.brl_saldo < ordem.valor_total) {
      return res.status(400).json({ message: 'no fouds.' });
    }

    // Verifica quantidade
    const brl_saldo = conta.brl_saldo - ordem.valor_total;
    const ativo_brl_saldo = ordem.valor_total;
    // owner
    const contaDonoDaOrdem = await ContaInterna.findByPk(
      ordem.conta_interna_id
    );

    const saldo =
      contaDonoDaOrdem.brl_saldo + (ordem.valor_total - ordem.comissao);
    const saldoAtivo = contaDonoDaOrdem.ativo_brl_saldo - ordem.valor_total;

    // Ativo do cliente
    const jaPossuiAtivo = await ClienteAtivo.findOne({
      where: { usuario_id: req.usuarioId },
    });

    const ativoDoDonoDaOrdem = await ClienteAtivo.findOne({
      where: { usuario_id: contaDonoDaOrdem.usuario_id },
    });

    ativoDoDonoDaOrdem.quantidade -= ordem.quantidade;
    ativoDoDonoDaOrdem.valor -= ordem.valor_total;

    const contaAtivo = await ContaAtivo.findOne({
      where: { ordem_id: ordem.id },
    });

    const ativo = await Ativo.findByPk(contaAtivo.ativo_id);

    const transaction = await db.connection.transaction();

    try {
      await ContaInterna.update(
        { brl_saldo, ativo_brl_saldo },
        { where: { usuario_id: req.usuarioId }, transaction }
      );

      // enviar valor para owner da ordem
      await ContaInterna.update(
        { brl_saldo: saldo, ativo_brl_saldo: saldoAtivo },
        { where: { id: contaDonoDaOrdem.id }, transaction }
      );

      // passar comissão
      await Comissao.create(
        {
          ordem_id,
          valor: ordem.comissao,
        },
        { transaction }
      );

      if (!jaPossuiAtivo) {
        await ClienteAtivo.update(
          {
            quantidade: ativoDoDonoDaOrdem.quantidade,
            valor: ativoDoDonoDaOrdem.valor,
          },
          { where: { usuario_id: contaDonoDaOrdem.usuario_id }, transaction }
        );

        await ClienteAtivo.create(
          {
            nome: ativo.nome_do_ativo,
            valor: Number(ordem.valor_total),
            quantidade: ordem.quantidade,
            usuario_id: req.usuarioId,
          },
          { transaction }
        );
      } else {
        await ClienteAtivo.update(
          {
            quantidade: ativoDoDonoDaOrdem.quantidade,
            valor: ativoDoDonoDaOrdem.valor,
          },
          { where: { usuario_id: contaDonoDaOrdem.usuario_id }, transaction }
        );

        await ClienteAtivo.update(
          {
            valor: jaPossuiAtivo.valor + ordem.valorTotal,
            quantidade: jaPossuiAtivo.quantidade + ordem.quantidade,
          },
          { where: { id: jaPossuiAtivo.id }, transaction }
        );
      }

      // Atualiza status da ordem
      await LivroDeOferta.update(
        {
          status: 'Executada',
          tipo_de_ordem: 'Compra',
          conta_interna_id: conta.id,
        },
        { where: { id: ordem_id }, transaction }
      );
      await transaction.commit();
      return res.status(201).json({ message: 'Ordem Executada!' });
    } catch (error) {
      await transaction.rollback();
      return res.status(401).json(error);
    }
  }
}

export default new CompraAtivoController();
