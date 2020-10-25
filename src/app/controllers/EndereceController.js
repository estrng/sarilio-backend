import * as Yup from 'yup';
import Endereco from '../models/Endereco';

class EnderecoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cep: Yup.string()
        .max(9)
        .required(),
      logradouro: Yup.string().required(),
      complemento: Yup.string(),
      bairro: Yup.string().required(),
      localidade: Yup.string().required(),
      uf: Yup.string().required(),
      unidade: Yup.string(),
      ibge: Yup.string(),
      gia: Yup.string(),
      numero: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      unidade,
      ibge,
      gia,
      numero,
    } = req.body;

    const usuario_id = req.usuarioId;

    const existeEndereco = await Endereco.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (existeEndereco) {
      return res
        .status(400)
        .json({ message: 'Esse usuario já possui Endereço!' });
    }

    try {
      const obj = {
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf,
        unidade,
        ibge,
        gia,
        numero,
        usuario_id,
      };

      await Endereco.create(obj);

      return res.status(201).json({ message: 'Endereço adicionado!' });
    } catch (error) {
      return res.status(401).json(error);
    }
  }

  async index(req, res) {
    const id = req.usuarioId;

    const endereco = await Endereco.findOne({ where: { usuario_id: id } });

    if (!endereco) {
      return res.status(401).json({ message: 'Nothing found!' });
    }
    return res.status(200).json(endereco);
  }

  async delete(req, res) {
    const id = req.usuarioId;

    const endereco = await Endereco.destroy({ where: { usuario_id: id } });

    if (!endereco) {
      return res.status(401).json({ message: 'Nothing to delete!' });
    }
    return res.status(200).json({ message: 'Deleted!' });
  }
}

export default new EnderecoController();

// ENDERECO Controller

// NOTE talvez a responsabilidade de consumir api de Cep seja do front end
/* NOTE pensar em uma estrategia de validação do cep
    e separar a requisição post da get do cep */
