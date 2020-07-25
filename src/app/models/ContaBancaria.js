import Sequelize, { Model } from 'sequelize';

class ContaBancaria extends Model {
  static init(sequelize) {
    super.init(
      {
        numero_do_banco: Sequelize.INTEGER,
        tipo_de_conta: Sequelize.STRING,
        agencia: Sequelize.INTEGER,
        numero_da_conta: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario);
  }
}

export default ContaBancaria;

// DATABASE Model de Conta bancaria
