import * as Yup from 'yup';
import db from '../../database';
import Ativo from '../models/Ativo';
import Qualificacao from '../models/Qualificacao';
import ClienteAtivo from '../models/ClienteAtivo';
import ContaInterna from '../models/ContaInterna';

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
      return res
        .status(400)
        .json('Você ainda não está ativo! Fale que seu supervisor');
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
      return res
        .status(400)
        .json('Você não tem saldo suficiente para realizar essa operação');
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

      // Atualizar o valor dd ativo na conta do usuario
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
}

export default new CompraAtivoController();
