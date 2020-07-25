import Sequelize, { Model } from 'sequelize';

class Ativo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_do_ativo: Sequelize.STRING,
        valor: Sequelize.FLOAT,
        comissao: Sequelize.FLOAT,
        quantidade_disponivel: Sequelize.FLOAT,
        tipo: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Categoria);
    this.hasMany(models.OfertaAtivo, { foreignKey: 'ativo_id' });
  }
}

export default Ativo;

// DATABASE Model de Ativos
