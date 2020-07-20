import * as Yup from 'yup';
import Endereco from '../models/Endereco';

class EnderecoController {
  async store(req, res) {
    return res.status(200).json('EnderecoController');
  }
}

export default new EnderecoController();

// DATABASE ContaBancaria controller
