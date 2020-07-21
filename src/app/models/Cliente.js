import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        status: { type: Sequelize.BOOLEAN, defaultValue: false },
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        tipo_de_cliente: Sequelize.STRING,

        conta_interna_id: Sequelize.INTEGER,
        endereco_id: Sequelize.INTEGER,
        conta_bancaria_id: Sequelize.INTEGER,
        representante_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async cliente => {
      if (cliente.senha) {
        cliente.senha_hash = await bcrypt.hash(cliente.senha, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ContaInterna, {
      foreignKey: 'conta_interna_id',
      as: 'user',
    });
  }
}

export default Cliente;

// DATABASE Model de cliente
