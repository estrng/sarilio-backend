import Sequelize, { Model } from 'sequelize';

class OfertaAtivo extends Model {
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

export default OfertaAtivo;

// DATABASE Model de Ativos
