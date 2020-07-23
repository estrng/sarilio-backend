import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Funcionario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        rg: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        endereco_id: {
          type: Sequelize.INTEGER,
          // Relacionamento
        },
      },
      { sequelize }
    );

    this.addHook('beforeSave', async funcionario => {
      if (funcionario.senha) {
        funcionario.senha_hash = await bcrypt.hash(funcionario.senha, 8);
      }
    });
    return this;
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}

export default Funcionario;
