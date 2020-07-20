module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('livro_de_ofertas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      tipo_de_ordem: { type: Sequelize.STRING(50), allowNull: false },
      ativo: { type: Sequelize.STRING(60), allowNull: false },
      preco_limite: { type: Sequelize.FLOAT, allowNull: false },
      valor_total: { type: Sequelize.FLOAT, allowNull: false },
      comissao: { type: Sequelize.FLOAT, allowNull: false },
      quantidade: { type: Sequelize.FLOAT, allowNull: false },
      status: { type: Sequelize.STRING(50), allowNull: false },
      created_at: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
        allowNull: false,
      },
      update_at: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('livro_de_ofertas');
  },
};
