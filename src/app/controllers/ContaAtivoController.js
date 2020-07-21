import * as Yup from 'yup';
import ContaAtivo from '../models/ContaAtivo';

class ContaAtivoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      conta_id: Yup.number()
        .integer()
        .required(),
      ativo_id: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // NOTE Na compra de um ATIVO essa store deve ser disparada

    return res.status(200).json('ContaAtivoController');
  }
}

export default new ContaAtivoController();

// DATABASE ContaAtivo controller
