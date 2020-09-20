import * as Yup from 'yup';
import Calc from '../../utils/calculos/calc';
import ClienteAtivo from '../models/ClienteAtivo';
import db from '../../database';
import LivroDeOferta from '../models/LivroDeOferta';
import ContaAtivo from '../models/ContaAtivo';

class LivroDeOfertaController {
  async store(req, res) {
    // Validação de dados
    const schema = Yup.object().shape({
      tipo_de_ordem: Yup.string()
        .max(50)
        .required(),
      preco_limite: Yup.number().required(),
      quantidade: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação de dados, verifique e tente novamente!',
      });
    }
    const { tipo_de_ordem, preco_limite, quantidade } = req.body;
    const { ativo_id } = req.query;

    // Deve possuir o ativo
    const ativo = await ClienteAtivo.findByPk(ativo_id, {
      attributes: ['quantidade', 'valor'],
    });

    if (!ativo) {
      return res.status(400).json('Você não possui ativo');
    }

    if (ativo.quantidade < quantidade) {
      return res.status(400).json('Você nao possui ativo suficiente');
    }

    // Calculo do valor total
    const valor_total = Calc.getValorTotalDaOrdem(preco_limite, quantidade);

    // Calculo da comissão
    const comissao = Calc.getValorTotalComissao(valor_total);

    // Deduz Ativo do Cliente
    ativo.quantidade -= quantidade;
    ativo.valor = preco_limite;

    const transaction = await db.connection.transaction();
    try {
      // NOTE A ordem deve pertecer a alguem
      await ClienteAtivo.update(
        { quantidade: ativo.quantidade },
        { where: { id: ativo_id }, transaction }
      );

      const { id } = await LivroDeOferta.create(
        {
          tipo_de_ordem,
          preco_limite,
          valor_total,
          comissao,
          quantidade,
          status: 'Aberta',
        },
        { transaction }
      );

      await ContaAtivo.create(
        {
          ordem_id: id,
          ativo_id: Number(ativo_id),
        },
        { transaction }
      );

      await transaction.commit();
      return res.status(200).json('All GOOD!');
    } catch (error) {
      await transaction.rollback();
      return res.status(400).json(error);
    }
  }
}
export default new LivroDeOfertaController();
