import * as Yup from 'yup';
import LivroDeOferta from '../models/LivroDeOferta';
import Qualificacao from '../models/Qualificacao';
import ContaInterna from '../models/ContaInterna';
import Ativo from '../models/Ativo';

class LivroDeOfertaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      tipo_de_ordem: Yup.string()
        .max(50)
        .required(),
      ativo: Yup.string()
        .max(60)
        .required(),
      preco_limite: Yup.number(),
      valor_total: Yup.number(),
      comissao: Yup.number(),
      quantidade: Yup.number(),
      status: Yup.string()
        .max(50)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verifica a qualificação do Cliente
    const { tipo } = await Qualificacao.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (tipo === 'Funcionario') {
      return res.status(400).json('Você não pode realizar essa operação');
    }

    const {
      tipo_de_ordem,
      ativo,
      preco_limite,
      comissao,
      quantidade,
      status,
    } = req.body;

    const valor_total = quantidade * preco_limite;

    const data = await Ativo.findOne({
      where: { nome_do_ativo: req.body.ativo },
    });

    const { valor, quantidade_disponivel } = data;

    if (quantidade_disponivel === 0) {
      return res.status(400).json('Ativo não disponivel');
    }

    if (quantidade > quantidade_disponivel) {
      return res.status(400).json('Quantidade indisponivel');
    }

    /* COnta interna */

    const conta = await ContaInterna.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (conta.brl_saldo === 0 || conta.brl_saldo < valor_total) {
      return res
        .status(400)
        .json('Você não tem saldo suficiente para realizar essa operação');
    }

    if (tipo_de_ordem === 'Compra') {
      /* TODO Deduzir quantidade do ativo */
    }

    if (preco_limite < valor) {
      return res
        .status(400)
        .json('O valor da ordem não pode ser menor que o valor atual do ativo');
    }

    /* await LivroDeOferta.create(obj); */

    return res.status(201).json({
      tipo_de_ordem,
      ativo,
      preco_limite,
      comissao,
      valor_total,
      quantidade,
      status,
      data,
    });
  }
}

export default new LivroDeOfertaController();

// DATABASE ContaBancaria controller
