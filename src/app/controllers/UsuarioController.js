import * as Yup from 'yup';
import Usuario from '../models/Usuario';
import Qualificacao from '../models/Qualificacao';
import PessoaFisica from '../models/PessoaFisica';
import ContaInterna from '../models/ContaInterna';
import Endereco from '../models/Endereco';
import getEntityById from '../../utils/functions/getEntityById';
import ClienteAtivo from '../models/ClienteAtivo';

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    } // NOTE Pensar uma util para essa função

    const usuarioExiste = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (usuarioExiste) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    try {
      await Usuario.create(req.body);

      return res.status(200).json({
        message:
          'Sua requisição foi efetivada com sucesso! Aguarde aprovação de conta',
      });
    } catch (error) {
      return res.status(401).json(error);
    }
  }

  async index(req, res) {
    const { id } = req.query;

    const qualificacao = await getEntityById.getTipoQualificacao(req.usuarioId);

    if (qualificacao) {
      return res.status(401).json('Not possible');
    }

    const info = await Usuario.findByPk(id, {
      attributes: ['id', 'email'],
      include: [
        { model: PessoaFisica, attributes: ['nome', 'cpf'] },
        { model: Qualificacao, attributes: ['tipo', 'status'] },
        {
          model: ContaInterna,
          attributes: ['id', 'brl_saldo', 'ativo_brl_saldo'],
        },
        {
          model: Endereco,
          attributes: [
            'cep',
            'logradouro',
            'numero',
            'complemento',
            'bairro',
            'localidade',
            'uf',
          ],
        },
        { model: ClienteAtivo },
      ],
    });
    return res.status(200).json(info);
  }
}

export default new UsuarioController();

// DATABASE - UsuarioController
