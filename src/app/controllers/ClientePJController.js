import * as Yup from 'yup';
import ClientePessoaJuridica from '../models/ClientePessoaJuridica';

class ClientePJController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string()
        .max(18)
        .required(),
      razao_social: Yup.string()
        .max(50)
        .required(),
      nome_fantasia: Yup.string().max(60),
      inscricao_estadual: Yup.string().max(50),
      telefone: Yup.string().max(14),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação de dados!' });
    }

    // NOTE Fazer relacionamentos com o cliente

    return res.status(200).json('PJ Controller');
  }
}

export default new ClientePJController();

// DATABASE Cliente PJ controller
