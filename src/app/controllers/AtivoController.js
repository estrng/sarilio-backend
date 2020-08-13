import * as Yup from 'yup';
import Ativos from '../models/Ativo';
import Qualificacao from '../models/Qualificacao';

class AtivoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome_do_ativo: Yup.string()
        .max(50)
        .required(),
      valor: Yup.number().required(),
      quantidade_disponivel: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação de dados, verifique e tente novamente!',
      });
    }

    const { tipo, status } = await Qualificacao.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (!(tipo === 'Funcionario')) {
      return res.status(400).json('Você não pode realizar essa operação');
    }

    if (status === 'Inativo') {
      return res
        .status(400)
        .json('Você ainda não está ativo! Fale que seu supervisor');
    }

    const existeCoin = await Ativos.findOne({
      where: { nome_do_ativo: req.body.nome_do_ativo },
    });

    if (existeCoin) {
      return res.status(400).json({
        error: 'Esse Ativo já existe, o mesmo não pode existir em duplicidade!',
      });
    }

    try {
      await Ativos.create(req.body);
      return res.status(201).json('Ativo adicioando com sucesso!');
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new AtivoController();

// ATIVO Ativocontroller
// NOTE Parte de inserção de ativos deve aparecer apenas para funcionarios
