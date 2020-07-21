import * as Yup from 'yup';
import ContaBancaria from '../models/ContaBancaria';

class ContaBancariaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      numero_do_banco: Yup.number()
        .integer()
        .required(),
      tipo_de_conta: Yup.number()
        .integer()
        .required(),
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

    return res.status(200).json('ContaBacariaController');
  }
}

export default new ContaBancariaController();

// DATABASE ContaBancaria controller
