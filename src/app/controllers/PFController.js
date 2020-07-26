import * as Yup from 'yup';
import { Op } from 'sequelize';
import PF from '../models/PessoaFisica';

class PFController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      nome: Yup.string().required(),
      data_de_nascimento: Yup.string(),
      nome_da_mae: Yup.string(),
      celular: Yup.string(),
      genero: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      cpf,
      nome,
      data_de_nascimento,
      nome_da_mae,
      celular,
      genero,
    } = req.body;

    const existeRegistro = await PF.findOne({
      where: {
        [Op.or]: [{ cpf: req.body.cpf }, { usuario_id: req.usuarioId }],
      },
    });
    if (existeRegistro) {
      return res.status(400).json({ error: 'Já existe um registro!' });
    }

    try {
      await PF.create({
        cpf,
        nome,
        data_de_nascimento,
        nome_da_mae,
        celular,
        genero,
        usuario_id: req.usuarioId,
      });
    } catch (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json({
      message:
        'Sua requisição foi efetivada com sucesso! Aguarde aprovação de conta',
    });
  }
}
export default new PFController();

// DATABASE - ClientePFController
