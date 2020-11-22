import * as Yup from 'yup';
import ContaBancaria from '../models/ContaBancaria';
import ContaInterna from '../models/ContaInterna';
import db from '../../database';
import PessoaFisica from '../models/PessoaFisica';

class FakeDepositoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      brl_saldo: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação de dados, verifique e tente novamente!',
      });
    }

    const { brl_saldo } = req.body;

    const conta = await ContaBancaria.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (!conta) {
      return res.status(401).json({ massage: 'Not found' });
    }

    const contaIterna = await ContaInterna.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (!contaIterna) {
      return res.status(401).json({ massage: 'Sem conta interna' });
    }

    const deposito = contaIterna.brl_saldo + Number(brl_saldo);

    const transaction = await db.connection.transaction();

    try {
      const { cpf } = await PessoaFisica.findByPk(req.usuarioId, {
        transaction,
      });

      if (cpf === conta.cpf) {
        await ContaInterna.update(
          { brl_saldo: deposito },
          {
            where: { usuario_id: req.usuarioId },
            transaction,
          }
        );
      }
      await transaction.commit();
      return res.status(201).json({ message: 'Depositado' });
    } catch (error) {
      await transaction.rollback();
      return res.status(401).json(error);
    }
  }
}

export default new FakeDepositoController();
