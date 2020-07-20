import Sequelize, { Model } from 'sequelize';

class ClientePessoaFisica extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: Sequelize.STRING,
        nome: Sequelize.STRING,
        data_de_nascimento: Sequelize.STRING,
        nome_da_mae: Sequelize.STRING,
        celular: Sequelize.STRING,
        genero: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default ClientePessoaFisica;

// DATABASE Cliente pessoa fisica controller
// NOTE lembresse de registrar esse classe no array de models
