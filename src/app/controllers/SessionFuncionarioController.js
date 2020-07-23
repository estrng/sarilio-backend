import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Funcionario from '../models/Funcionario';
import authConfig from '../../config/auth';

class SessionFuncionarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, senha } = req.body;

    const funcionario = await Funcionario.findOne({
      where: { email },
    });

    if (!funcionario) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await funcionario.checkPassword(senha))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id } = funcionario;

    return res.json({
      funcionario: {
        id,
        email,
      },
      token: jwt.sign({ id, funcionario: true }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionFuncionarioController();
