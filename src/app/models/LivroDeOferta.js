import Sequelize, { Model } from 'sequelize';

class LivroDeOferta extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo_de_ordem: Sequelize.STRING,
        ativo: Sequelize.STRING,
        preco_limite: Sequelize.FLOAT,
        valor_total: Sequelize.FLOAT,
        comissao: Sequelize.FLOAT,
        quantidade: Sequelize.FLOAT,
        status: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ContaInterna);
    this.hasMany(models.OfertaAtivo, { foreignKey: 'ordem_id' });
  }
}

export default LivroDeOferta;
