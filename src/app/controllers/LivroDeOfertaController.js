import * as Yup from 'yup';
import LivroDeOferta from '../models/LivroDeOferta';

class LivroDeOfertaController {
  async store(req, res) {
    return res.status(200).json('LivroDeOfertaController');
  }
}

export default new LivroDeOfertaController();

// DATABASE ContaBancaria controller
