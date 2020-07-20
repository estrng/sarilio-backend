import Sequelize, { Model } from 'sequelize';

class Funcinario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        rg: Sequelize.STRING,
        email: Sequelize.STRING,
        senha_hash: Sequelize.STRING,
        endereco_id: {
          type: Sequelize.INTEGER,
          // Relacionamento
        },
      },
      { sequelize }
    );
    return this;
  }
}

export default Funcinario;
