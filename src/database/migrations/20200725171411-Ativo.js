module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ativo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      nome_do_ativo: { type: Sequelize.STRING, allowNull: false },
      valor: { type: Sequelize.FLOAT, allowNull: false },
      quantidade_disponivel: { type: Sequelize.FLOAT, allowNull: false },

      categoria_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Categoria', key: 'id' },
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
    return queryInterface.dropTable('Ativo');
  },
};
