module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conta_ativos', {
      CONTA_ATIVO_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      CONTA_ID: {
        type: Sequelize.INTEGER,
        references: { model: 'conta_interna', key: 'CONTA_ID' },
        allowNull: false,
      },

      ATIVO_ID: {
        type: Sequelize.INTEGER,
        references: { model: 'ativos', key: 'ATIVO_ID' },
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('conta_ativos');
  },
};
