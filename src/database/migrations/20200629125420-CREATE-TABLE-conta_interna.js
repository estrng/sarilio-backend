module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conta_interna', {
      CONTA_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TITULAR: Sequelize.STRING(60),
      BRL_SALDO: Sequelize.FLOAT,
      ATIVO_BRL_SALDO: Sequelize.FLOAT,
      CREATED_AT: Sequelize.DATE,
      UPDATED_AT: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('conta_interna');
  },
};
