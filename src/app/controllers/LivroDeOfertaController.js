import * as Yup from 'yup';
import LivroDeOferta from '../models/LivroDeOferta';
import ContaInterna from '../models/ContaInterna';
import GetEntityById from '../../utils/functions/getEntityById';
import getValorTotalDaOrdem from '../../utils/calculos/calc';

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

    if (!(await GetEntityById.getTipoQualificacao(req.usuarioId))) {
      return res.status(401).json('Não pode realizar essa operação!');
    }

    const {
      tipo_de_ordem,
      ativo,
      preco_limite,
      comissao,
      quantidade,
      status,
    } = req.body;

    const valor_total = getValorTotalDaOrdem(quantidade, preco_limite);

    if ((await GetEntityById.getDadosDoAtivo(ativo, quantidade)) > 0) {
      return res.status(401).json('Operação indisponivel!');
    }

    parei aqui!!
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
      conta.brl_saldo -= valor_total;

      try {
        /* await ContaInterna.update(conta); */
      } catch (error) {
        return res.status(400).json('Supostamente nunca era para chegar aqui!');
      }
      /* TODO Deduzir quantidade do ativo */
    }

    if (preco_limite < valor) {
      return res
        .status(400)
        .json('O valor da ordem não pode ser menor que o valor atual do ativo');
    }

    /* const obj = {
      tipo_de_ordem,
      preco_limite,
      valor_total,
      comissao,
      quantidade,
      status,
      conta_interna_id,
    }; */

    try {
      /* await LivroDeOferta.create(obj); */
    } catch (error) {
      return res.status(401).json(error);
    }

    return res.status(201).json('Requisição adicionada ao BOOK!');
  }
}

export default new LivroDeOfertaController();

// DATABASE ContaBancaria controller
