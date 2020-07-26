import * as Yup from 'yup';
import Qualificacao from '../models/Qualificacao';

class QualificacaoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      tipo: Yup.string().required(),
      status: Yup.string().default('false'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { tipo, status } = req.body;

    const usuario_id = req.usuarioId;

    const existeQualificacao = await Qualificacao.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (existeQualificacao) {
      return res
        .status(400)
        .json({ message: 'Esse usuario já possui uma qualificação!' });
    }

    try {
      await Qualificacao.create({ tipo, status, usuario_id });
      return res
        .status(200)
        .json(`Muito bem você se classificou como: ${tipo}`);
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}
export default new QualificacaoController();
