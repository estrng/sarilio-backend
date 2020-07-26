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
    this.hasMany(models.OfertaAtivo, {
      foreignKey: 'ativo_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default Ativo;

// DATABASE Model de Ativos
// NOTE Talvez teremos que att o banco para controlar estoque de ativos.
