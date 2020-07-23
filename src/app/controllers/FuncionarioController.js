import * as Yup from 'yup';
import Funcionario from '../models/Funcionario';

class FuncionarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      rg: Yup.string(),
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

    const funcionarioExiste = await Funcionario.findOne({
      where: { email: req.body.email },
    });

    if (funcionarioExiste) {
      return res.status(400).json({ error: 'Employer already exists.' });
    }

    const { nome } = await Funcionario.create(req.body);

    return res.status(200).json({
      message: `${nome}, Bem vindo a Sarilio Keep Corp, pronto para por a mão na massa?`,
    });
  }
}

export default new FuncionarioController();

// DATABASE ContaBancaria controller
