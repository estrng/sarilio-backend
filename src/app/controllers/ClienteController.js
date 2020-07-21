import * as Yup from 'yup';
import Cliente from '../models/Cliente';

class ClienteController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string()
        .required()
        .min(6),
      tipo_de_cliente: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    } // NOTE Pensar uma util para essa função

    const clienteExiste = await Cliente.findOne({
      where: { email: req.body.email },
    });

    if (clienteExiste) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { email, senha_hash } = await Cliente.create(req.body);

    return res.status(200).json({
      message:
        'Sua requisição foi efetivada com sucesso! Aguarde aprovação de conta',
      email,
      senha_hash,
    });
  }
}

export default new ClienteController();

// DATABASE - ClienteController
