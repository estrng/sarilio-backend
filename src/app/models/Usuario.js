import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async usuario => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.ContaBancaria, {
      foreignKey: 'usuario_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.senha_hash);
  }
}

export default Usuario;
