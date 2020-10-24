import Sequelize, { Model } from 'sequelize';

class Comissao extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: Sequelize.FLOAT,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.LivroDeOferta, {
      foreignKey: 'ordem_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default Comissao;
