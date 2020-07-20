import Sequelize, { Model } from 'sequelize';

class ClientePessoaJuridica extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        nome_fantasia: Sequelize.STRING,
        razao_social: Sequelize.STRING,
        inscricao_estadual: Sequelize.STRING,
        telefone: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default ClientePessoaJuridica;
