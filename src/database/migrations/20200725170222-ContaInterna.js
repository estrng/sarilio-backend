module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ContaInterna', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      brl_saldo: Sequelize.FLOAT,
      ativo_brl_saldo: Sequelize.FLOAT,

      usuario_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Usuario', key: 'id' },
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
    return queryInterface.dropTable('ContaInterna');
  },
};
