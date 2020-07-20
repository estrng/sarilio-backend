import * as Yup from 'yup';
import Ativo from '../models/Ativo';

class AtivoController {
  async store(req, res) {
    return res.status(200).json('AtivoController');
  }
}

export default new AtivoController();

// DATABASE Ativocontroller
