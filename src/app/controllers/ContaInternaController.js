import * as Yup from 'yup';
import ContaInterna from '../models/ContaInterna';

class ContaInternaController {
  async store(req, res) {
    return res.status(200).json('ContaInternaController');
  }
}

export default new ContaInternaController();

// DATABASE ContaBancaria controller
