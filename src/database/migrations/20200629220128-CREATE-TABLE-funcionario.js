module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcionario', {
      MATRICULA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      NOME: Sequelize.STRING(150),
      CPF: { type: Sequelize.STRING(14), unique: true },
      RG: Sequelize.STRING(20),
      EMAIL: Sequelize.STRING(255),
      SENHA_HASH: Sequelize.STRING(16),
      ENDERECO_ID: {
        type: Sequelize.INTEGER,
        references: { model: 'endereco', key: 'ENDERECO_ID' },
      },
      CREATED_AT: { type: Sequelize.DATE, allowNull: false },
      UPDATED_AT: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('funcionario');
  },
};
