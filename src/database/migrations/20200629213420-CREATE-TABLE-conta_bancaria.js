module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conta_bancaria', {
      CONTA_BANCARIA_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      NUMERO_DO_BANCO: Sequelize.INTEGER,
      TIPO_DE_CONTA: Sequelize.STRING(50),
      AGENCIA: Sequelize.INTEGER,
      NUMERO_DA_CONTA: Sequelize.INTEGER,
      CREATED_AT: { type: Sequelize.DATE, allowNull: true },
      UPDATED_AT: { type: Sequelize.DATE, allowNull: true },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('conta_bancaria');
  },
};
