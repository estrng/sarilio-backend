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

    this.hasMany(models.ClienteAtivo, {
      foreignKey: 'usuario_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    this.hasOne(models.ContaInterna, { foreignKey: 'usuario_id' });
    this.hasOne(models.PessoaFisica, { foreignKey: 'usuario_id' });
    this.hasOne(models.PessoaJuridica, { foreignKey: 'usuario_id' });
    this.hasOne(models.Qualificacao, { foreignKey: 'usuario_id' });
    this.hasOne(models.Endereco, { foreignKey: 'usuario_id' });
    /* NOTE talvez aqui vou ter que colocar um hasOne para podermos
    fazer querys com include */
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.senha_hash);
  }
}

export default Usuario;
