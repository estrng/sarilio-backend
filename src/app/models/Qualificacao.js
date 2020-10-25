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
    this.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default Qualificacao;
