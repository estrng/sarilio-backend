module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LivroDeOferta', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      tipo_de_ordem: { type: Sequelize.STRING, allowNull: false },
      preco_limite: { type: Sequelize.FLOAT, allowNull: false },
      valor_total: { type: Sequelize.FLOAT, allowNull: false },
      comissao: { type: Sequelize.FLOAT, allowNull: false },
      quantidade: { type: Sequelize.FLOAT, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false },

      conta_interna_id: {
        type: Sequelize.INTEGER,
        references: { model: 'ContaInterna', key: 'id' },
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
    return queryInterface.dropTable('LivroDeOferta');
  },
};
