import Qualificacao from '../models/Qualificacao';

class ManutencaoController {
  async updatedStatus(req, res) {
    const { usu_id } = req.body;

    // Verificda se o usuario é um Funcionario
    const { tipo } = await Qualificacao.findOne({
      where: { usuario_id: req.usuarioId },
    });

    if (!(tipo === 'Funcionario')) {
      return res.status(400).json('Você não é um funcionario');
    }

    // Verifica o status atual do cliente
    const qualificacao = await Qualificacao.findOne({
      where: { usuario_id: usu_id },
    });

    if (qualificacao.status === 'Ativo') {
      return res.status(400).json('Este usuario já esta ativo');
    }

    try {
      await qualificacao.update({ status: 'Ativo' });
      return res.status(200).json('Usuario ativado e pronto para operar');
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}

export default new ManutencaoController();

// MANUTENCAO Controller da entidade virtual de manutenção
