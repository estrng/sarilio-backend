module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ativos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_do_ativo: { type: Sequelize.STRING(50), allowNull: false },
      valor: { type: Sequelize.FLOAT, allowNull: false },
      comissao: { type: Sequelize.FLOAT, allowNull: false },
      quantidade_disponivel: { type: Sequelize.FLOAT, allowNull: false },
      tipo: Sequelize.STRING(60),

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('ativos');
  },
};
