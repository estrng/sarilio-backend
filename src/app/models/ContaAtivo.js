import Sequelize, { Model } from 'sequelize';

class ContaAtivo extends Model {
  static init(sequelize) {
    super.init(
      {
        ordem_id: Sequelize.INTEGER,
        ativo_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ativo, {
      foreignKey: 'ativo_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    this.belongsTo(models.LivroDeOferta, {
      foreignKey: 'ordem_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default ContaAtivo;

// DATABASE Model de Ativos
