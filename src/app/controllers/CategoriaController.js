import * as Yup from 'yup';
import Categoria from '../models/Categoria';

class CategoriaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação de dados',
      });
    }

    const existeCategoria = await Categoria.findOne({
      where: { descricao: req.body.descricao },
    });

    if (existeCategoria) {
      return res.status(400).json('Já existe esta categoria!');
    }

    try {
      await Categoria.create(req.body);
      return res.status(201);
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}

export default new CategoriaController();
