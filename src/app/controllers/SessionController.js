import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Usuario from '../models/Usuario';
import authConfig from '../../config/auth';

class SessionClienteController {
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

    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id } = usuario;

    return res.json({
      usuario: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionClienteController();
