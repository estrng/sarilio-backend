/* eslint-disable no-unused-expressions */
import Qualificacao from '../../app/models/Qualificacao';
import Ativo from '../../app/models/Ativo';

class GetEntetityById {
  async getTipoQualificacao(id) {
    const { tipo } = await Qualificacao.findOne({
      where: { usuario_id: id },
    });

    if (tipo === 'Funcionario') {
      return false;
    }
    return true;
  }

  async getDadosDoAtivo(ativo, quantidade) {
    const { quantidade_disponivel } = await Ativo.findOne({
      where: { nome_do_ativo: ativo },
    });

    let res = 0;

    quantidade_disponivel === 0 ? (res = 1) : res;

    quantidade > quantidade_disponivel ? (res += 1) : res;

    return res;
  }
}

export default new GetEntetityById();
