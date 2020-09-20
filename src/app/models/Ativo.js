import Sequelize, { Model } from 'sequelize';

class Ativo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_do_ativo: Sequelize.STRING,
        valor: Sequelize.FLOAT,
        quantidade_disponivel: Sequelize.FLOAT,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.ContaAtivo, {
      foreignKey: 'ativo_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    this.belongsTo(models.Categoria, {
      foreignKey: 'categoria_id',
      as: 'Categoria',
    });
  }
}

export default Ativo;

// ATIVO Model de Ativos
// NOTE Talvez teremos que att o banco para controlar estoque de ativos.
