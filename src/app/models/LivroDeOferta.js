import Sequelize, { Model } from 'sequelize';

class LivroDeOferta extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo_de_ordem: Sequelize.STRING,
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
    this.belongsTo(models.ContaInterna, {
      foreignKey: 'conta_interna_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    this.belongsToMany(models.Ativo, {
      through: 'ContaAtivo',
      foreignKey: 'ordem_id',
    });

    this.hasMany(models.ContaAtivo, {
      foreignKey: 'ordem_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    this.hasOne(models.Comissao, {
      foreignKey: 'ordem_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default LivroDeOferta;
