import * as Yup from 'yup';
import Endereco from '../models/Endereco';
import externalAPI from '../../services/externalAPI';

class EnderecoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cep: Yup.string()
        .max(9)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { cep, numero } = req.body;

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
      const { data } = await externalAPI.get(`${cep}/json`);

      const obj = {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        unidade: data.unidade,
        ibge: data.ibge,
        gia: data.gia,
        numero,
        usuario_id,
      };

      await Endereco.create(obj);

      return res.status(201).json();
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}

export default new EnderecoController();

// ENDERECO Controller

// NOTE talvez a responsabilidade de consumir api de Cep seja do front end
/* NOTE pensar em uma estrategia de validação do cep
    e separar a requisição post da get do cep */
