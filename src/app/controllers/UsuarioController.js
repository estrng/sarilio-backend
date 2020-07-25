import * as Yup from 'yup';
import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    } // NOTE Pensar uma util para essa função

    const usuarioExiste = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (usuarioExiste) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    try {
      await Usuario.create(req.body);
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Algo deu errado! Veja o Erro: ', error });
    }

    return res.status(200).json({
      message:
        'Sua requisição foi efetivada com sucesso! Aguarde aprovação de conta',
    });
  }
}

export default new UsuarioController();

// DATABASE - ClienteController
