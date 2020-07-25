import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        senha_hash: { type: DataTypes.STRING, allowNull: false },
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.PessoaFisica);
    this.belongsTo(models.PessoaJuridica);
    this.belongsTo(models.Qualificacao);
    this.belongsTo(models.ContaInterna);
    this.belongsTo(models.Endereco);
    this.hasMany(models.ContaBancaria, { foreignKey: 'usuario_id' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Usuario;
