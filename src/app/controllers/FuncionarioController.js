import * as Yup from 'yup';
import Funcionario from '../models/Funcionario';

class FuncionarioController {
  async store(req, res) {
    return res.status(200).json('FuncionarioController');
  }
}

export default new FuncionarioController();

// DATABASE ContaBancaria controller
