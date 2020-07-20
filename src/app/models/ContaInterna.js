import Sequelize, { Model } from 'sequelize';

class ContaInterna extends Model {
  static init(sequelize) {
    super.init(
      {
        titular: { type: Sequelize.STRING, allowNull: false },
        brl_saldo: Sequelize.FLOAT,
        ativo_brl_saldo: Sequelize.FLOAT,
      },
      { sequelize }
    );
    return this;
  }
}

export default ContaInterna;

// DATABASE Model de conta interna
