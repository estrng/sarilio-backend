module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conta_ativos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      conta_id: {
        type: Sequelize.INTEGER,
        references: { model: 'conta_interna', key: 'id' },
        allowNull: false,
      },

      ativo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'ativos', key: 'id' },
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('conta_ativos');
  },
};
