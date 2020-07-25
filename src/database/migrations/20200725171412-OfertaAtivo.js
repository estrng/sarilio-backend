module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ContaAtivo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      ordem_id: {
        type: Sequelize.INTEGER,
        references: { model: 'LivroDeOferta', key: 'id' },
        allowNull: false,
      },

      ativo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Ativo', key: 'id' },
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('ContaAtivo');
  },
};
