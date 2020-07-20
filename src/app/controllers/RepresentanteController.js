import * as Yup from 'yup';
import Representante from '../models/Representante';

class RepresentanteController {
  async store(req, res) {
    return res.status(200).json('RepresentanteController');
  }
}

export default new RepresentanteController();

// DATABASE ContaBancaria controller
