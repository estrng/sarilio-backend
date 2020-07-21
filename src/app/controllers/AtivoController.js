import * as Yup from 'yup';
import Ativos from '../models/Ativo';

class AtivoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome_do_ativo: Yup.string()
        .max(50)
        .required(),
      valor: Yup.number().required(),
      comissao: Yup.number().required(),
      quantidade_disponivel: Yup.number().required(),
      tipo: Yup.string()
        .max(60)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação de dados, verifique e tente novamente!',
      });
    }

    const existeCoin = await Ativos.findOne({
      where: { nome_do_ativo: req.body.nome_do_ativo },
    });

    if (existeCoin) {
      return res.status(400).json({
        error: 'Esse Ativo já existe, o mesmo não pode existir em duplicidade!',
      });
    }

    // NOTE só poderá adicionar ativos se for um funcionári logado

    const data = await Ativos.create(req.body);

    return res.status(200).json(data);
  }
}

export default new AtivoController();

// DATABASE Ativocontroller
