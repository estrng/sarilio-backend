import Sequelize, { Model } from 'sequelize';

class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Ativo, { foreignKey: 'categoria_id' });
  }
}

export default Categoria;

// DATABASE Model de Ativos
