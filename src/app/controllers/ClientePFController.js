import * as Yup from 'yup';
import ClientePessoaFisica from '../models/ClientePessoaFisica';

class ClientePFController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      nome: Yup.string().required(),
      data_de_nascimento: Yup.string(),
      nome_da_mae: Yup.string(),
      celular: Yup.string(),
      genero: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!req.clienteId) {
      return res.status(400).json({ error: 'Você não é um cliente!' });
    }

    const clientePFExiste = await ClientePessoaFisica.findOne({
      where: { cpf: req.body.cpf },
    });

    if (clientePFExiste) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { email, senha_hash } = await ClientePessoaFisica.create(req.body);

    return res.status(200).json({
      message:
        'Sua requisição foi efetivada com sucesso! Aguarde aprovação de conta',
      email,
      senha_hash,
    });
  }
}
export default new ClientePFController();

// DATABASE - ClientePFController
