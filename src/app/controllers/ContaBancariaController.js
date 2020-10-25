import * as Yup from 'yup';
import ContaBancaria from '../models/ContaBancaria';

class ContaBancariaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      titular: Yup.string().required(),
      numero_do_banco: Yup.number()
        .integer()
        .required(),
      tipo_de_conta: Yup.string().required(),
      agencia: Yup.number()
        .integer()
        .required(),
      numero_da_conta: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      cpf,
      titular,
      numero_do_banco,
      tipo_de_conta,
      agencia,
      numero_da_conta,
    } = req.body;

    const contaExiste = await ContaBancaria.findOne({
      where: { numero_da_conta },
    });

    if (contaExiste) {
      return res.status(400).json('Essa conta já existe!');
    }

    try {
      await ContaBancaria.create({
        cpf,
        titular,
        numero_do_banco,
        tipo_de_conta,
        agencia,
        numero_da_conta,
        usuario_id: req.usuarioId,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json('Conta bancaria adicionada com sucesso!');
  }

  async index(req, res) {
    const conta = await ContaBancaria.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (!conta) {
      return res.status(200).json({ message: 'Nothing found!' });
    }
    return res.status(200).json(conta);
  }

  async delete(req, res) {
    const id = req.usuarioId;

    const conta = await ContaBancaria.destroy({ where: { usuario_id: id } });

    if (!conta) {
      return res.status(200).json({ message: 'Nothing to delete!' });
    }
    return res.status(200).json({ message: 'Deleted!' });
  }
}

export default new ContaBancariaController();

// DATABASE ContaBancaria controller
/* NOTE Talvez teremos que mudar o tipo de dado do campo
agencia pois a requisição JSON não aceita 0 a esquerda. */
