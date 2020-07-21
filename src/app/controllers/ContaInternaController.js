import * as Yup from 'yup';
import ContaInterna from '../models/ContaInterna';

class ContaInternaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      titular: Yup.string()
        .max(60)
        .required(),
      brl_saldo: Yup.number(),
      ativo_brl_saldo: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return res.status(200).json('ContaInternaController');
  }
}

export default new ContaInternaController();

// DATABASE ContaBancaria controller
