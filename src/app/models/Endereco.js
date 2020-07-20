import Sequelize, { Model } from 'sequelize';

class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: Sequelize.STRING,
        logradouro: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        bairro: Sequelize.STRING,
        localidade: Sequelize.STRING,
        uf: Sequelize.STRING,
        unidade: Sequelize.STRING,
        ibge: Sequelize.STRING,
        gia: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default Endereco;

// DATABASE Model de endereco
// NOTE Utilizar API da Via cep para buscar o CEP automaticamente
