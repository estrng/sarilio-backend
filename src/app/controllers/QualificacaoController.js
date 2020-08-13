import * as Yup from 'yup';
import Qualificacao from '../models/Qualificacao';

class QualificacaoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      tipo: Yup.string().required(),
      status: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { tipo } = req.body;

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
      if (tipo === 'Funcionario') {
        const obj = { tipo, status: 'Ativo', usuario_id };

        await Qualificacao.create(obj);
        return res.status(201).json();
      }

      await Qualificacao.create({ tipo, status: 'Inativo', usuario_id });
      return res.status(201).json();
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}
export default new QualificacaoController();
