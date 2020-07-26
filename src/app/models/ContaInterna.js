import Sequelize, { Model } from 'sequelize';

class ContaInterna extends Model {
  static init(sequelize) {
    super.init(
      {
        titular: { type: Sequelize.STRING, allowNull: false },
        brl_saldo: Sequelize.FLOAT,
        ativo_brl_saldo: Sequelize.FLOAT,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.LivroDeOferta, {
      foreignKey: 'conta_interna_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    this.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default ContaInterna;

// DATABASE Model de conta interna
