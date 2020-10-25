import * as Yup from 'yup';
import ContaInterna from '../models/ContaInterna';
import Qualificacao from '../models/Qualificacao';

class ContaInternaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      usu_id: Yup.number().required(),
      brl_saldo: Yup.number(),
      ativo_brl_saldo: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { usu_id } = req.body;

    // Verifica se o clinte esta ativo
    const { status } = await Qualificacao.findOne({
      where: { usuario_id: usu_id },
    });

    if (status === 'Inativo') {
      return res.status(400).json('Esse Cliente não esta ativo');
    }

    // Verificda se o usuario é um Funcionario
    const { tipo } = await Qualificacao.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (!(tipo === 'Funcionario')) {
      return res.status(400).json('Você não é um funcionario');
    }

    // Verifica se cliente já tem conta
    const existeContaInterna = await ContaInterna.findOne({
      where: { usuario_id: usu_id },
    });

    if (existeContaInterna) {
      return res.status(400).json('Esse Cliente já possui uma conta interna');
    }

    // Cria conta para o cliente
    try {
      await ContaInterna.create({
        brl_saldo: 0.0,
        ativo_brl_saldo: 0.0,
        usuario_id: usu_id,
      });
      return res.status(201).json('Ok!!');
    } catch (error) {
      return res.status(401).json(error);
    }
  }

  async index(req, res) {
    const id = req.usuarioId;

    const conta = await ContaInterna.findOne({
      where: { usuario_id: id },
    });

    if (!conta) {
      return res.status(200).json({ message: 'Nothing to show!' });
    }

    return res.status(200).json(conta);
  }
}

export default new ContaInternaController();

// DATABASE ContaBancaria controller
