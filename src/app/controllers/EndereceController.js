import * as Yup from 'yup';
import Endereco from '../models/Endereco';

class EnderecoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cep: Yup.string()
        .max(9)
        .required(),
      logradouro: Yup.string().max(100),
      numero: Yup.string().max(10),
      complemento: Yup.string().max(60),
      bairro: Yup.string().max(60),
      localidade: Yup.string().max(100),
      uf: Yup.string().max(2),
      unidade: Yup.string().max(100),
      ibge: Yup.string().max(8),
      gia: Yup.string().max(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // NOTE Pegar o CEP altomaticamente no front

    return res.status(200).json('EnderecoController');
  }
}

export default new EnderecoController();

// DATABASE ContaBancaria controller
