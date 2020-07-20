import * as Yup from 'yup';
import ContaBancaria from '../models/ContaBancaria';

class ContaBancariaController {
  async store(req, res) {
    return res.status(200).json('ContaBacariaController');
  }
}

export default new ContaBancariaController();

// DATABASE ContaBancaria controller
