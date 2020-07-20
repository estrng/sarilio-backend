import * as Yup from 'yup';
import ContaAtivo from '../models/ContaAtivo';

class ContaAtivoController {
  async store(req, res) {
    return res.status(200).json('ContaAtivoController');
  }
}

export default new ContaAtivoController();

// DATABASE ContaAtivo controller
