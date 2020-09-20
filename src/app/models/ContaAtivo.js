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
    this.belongsTo(models.Ativo);
    this.belongsTo(models.LivroDeOferta);
  }
}

export default ContaAtivo;

// DATABASE Model de Ativos
