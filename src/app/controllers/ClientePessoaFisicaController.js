import * as Yup from 'yup';
// import ClientePessoaFisica from '../models/Cliente_pessoa_fisica';

class ClientePessoaFisicaController {
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
    } // validação do que contem dentro do Schema com o Body

    // NOTE pegar o id cliente e fazer o relacionamento
    const {
      cpf,
      nome,
      data_de_nascimento,
      nome_da_mae,
      celular,
      genero,
    } = await req.body;

    return res
      .status(200)
      .json({ cpf, nome, data_de_nascimento, nome_da_mae, celular, genero });
  }
}
export default new ClientePessoaFisicaController();

// DATABASE - ClienteController
