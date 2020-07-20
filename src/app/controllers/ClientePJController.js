import * as Yup from 'yup';
import ClientePessoaJuridica from '../models/ClientePessoaJuridica';

class ClientePJController {
  async store(req, res) {
    return res.status(200).json('PJ Controller');
  }
}

export default new ClientePJController();

// DATABASE Cliente PJ controller
