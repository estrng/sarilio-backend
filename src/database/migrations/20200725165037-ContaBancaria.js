module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ContaBancaria', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      cpf: { type: Sequelize.STRING, unique: true, allowNull: false },
      titular: Sequelize.STRING,
      numero_do_banco: { type: Sequelize.INTEGER, allowNull: false },
      tipo_de_conta: { type: Sequelize.STRING, allowNull: false },
      agencia: { type: Sequelize.INTEGER, allowNull: false },
      numero_da_conta: { type: Sequelize.INTEGER, allowNull: false },

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
    return queryInterface.dropTable('ContaBancaria');
  },
};
