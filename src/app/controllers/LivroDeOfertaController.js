import * as Yup from 'yup';
import LivroDeOferta from '../models/LivroDeOferta';

class LivroDeOfertaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      tipo_de_ordem: Yup.string()
        .max(50)
        .required(),
      ativo: Yup.string()
        .max(60)
        .required(),
      preco_limite: Yup.number(),
      valor_total: Yup.number(),
      comissao: Yup.number(),
      quantidade: Yup.number(),
      status: Yup.string()
        .max(50)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return res.status(200).json('LivroDeOfertaController');
  }
}

export default new LivroDeOfertaController();

// DATABASE ContaBancaria controller
