module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comissao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ordem_id: {
        type: Sequelize.INTEGER,
        references: { model: 'LivroDeOferta', key: 'id' },
        allowNull: false,
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('Comissao');
  },
};
