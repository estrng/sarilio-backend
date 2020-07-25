import Sequelize, { Model } from 'sequelize';

class Qualificacao extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasOne(models.Usuario, { foreignKey: 'usuario_id' });
  }
}

export default Qualificacao;
