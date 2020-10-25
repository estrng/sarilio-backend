import * as Yup from 'yup';
import { Op } from 'sequelize';
import PJ from '../models/PessoaJuridica';

class PJController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string()
        .max(18)
        .required(),
      razao_social: Yup.string()
        .max(50)
        .required(),
      nome_fantasia: Yup.string().max(60),
      inscricao_estadual: Yup.string().max(50),
      telefone: Yup.string().max(14),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação de dados!' });
    }

    const {
      cnpj,
      razao_social,
      nome_fantasia,
      inscricao_estadual,
      telefone,
    } = req.body;

    const existeRegistro = await PJ.findOne({
      where: {
        [Op.or]: [{ cnpj: req.body.cnpj }, { usuario_id: req.usuarioId }],
      },
    });

    if (existeRegistro) {
      return res.status(400).json({ message: 'Já existe um registro!' });
    }

    const usuario_id = req.usuarioId;

    try {
      await PJ.create({
        cnpj,
        razao_social,
        nome_fantasia,
        inscricao_estadual,
        telefone,
        usuario_id,
      });
      return res.status(200).json('Seu registro foi realizado com sucesso');
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new PJController();

// DATABASE Cliente PJ controller
