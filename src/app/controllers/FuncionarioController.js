import * as Yup from 'yup';
import Funcionario from '../models/Funcionario';

class FuncionarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(150).required(),
      cpf: Yup.string(14).required(),
      rg: Yup.string(20),
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string()
        .min(6)
        .required(),
      endereco_id: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return res.status(200).json('FuncionarioController');
  }
}

export default new FuncionarioController();

// DATABASE ContaBancaria controller
