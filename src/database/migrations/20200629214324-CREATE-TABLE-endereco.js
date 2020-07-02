module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('endereco', {
      ENDERECO_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      CEP: Sequelize.STRING(9),
      LOGRADOURO: Sequelize.STRING(100),
      NUMERO: Sequelize.STRING(10),
      COMPLEMENTO: Sequelize.STRING(60),
      BAIRRO: Sequelize.STRING(60),
      LOCALIDADE: Sequelize.STRING(100),
      UF: Sequelize.STRING(2),
      UNIDADE: Sequelize.STRING(100),
      IBGE: Sequelize.STRING(8),
      GIA: Sequelize.STRING(5),
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('endereco');
  },
};
