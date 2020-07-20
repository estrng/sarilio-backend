module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conta_bancaria', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      numero_do_banco: { type: Sequelize.INTEGER, allowNull: false },
      tipo_de_conta: { type: Sequelize.STRING, allowNull: false },
      agencia: { type: Sequelize.INTEGER, allowNull: false },
      numero_da_conta: { type: Sequelize.INTEGER, allowNull: false },
      created_at: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('conta_bancaria');
  },
};
