import * as Yup from 'yup';
import Representante from '../models/Representante';

class RepresentanteController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .max(60)
        .required(),
      tipo_de_representacao: Yup.string()
        .max(60)
        .required(),
      CPF: Yup.string()
        .max(14)
        .required(),
      endereco_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return res.status(200).json('RepresentanteController');
  }
}

export default new RepresentanteController();

// DATABASE ContaBancaria controller
