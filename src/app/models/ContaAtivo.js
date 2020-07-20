import Sequelize, { Model } from 'sequelize';

class ContaAtivo extends Model {
  static init(sequelize) {
    super.init(
      {
        conta_id: Sequelize.INTEGER,
        ativo_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }
}

export default ContaAtivo;

// DATABASE Model de conta ativo
// NOTE Essa model deve ser usada automaticamente pela compra e venda de ativos
