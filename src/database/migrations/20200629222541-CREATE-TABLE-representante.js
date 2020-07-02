module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('representante', {
      REPRESENTANTE_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      NOME: Sequelize.STRING(150),
      TIPO_DE_REPRESENTACAO: Sequelize.STRING(60),
      CPF: { type: Sequelize.STRING(14), unique: true },
      CREATED_AT: { type: Sequelize.DATE, allowNull: false },
      UPDATED_AT: { type: Sequelize.DATE, allowNull: false },
      ENDERECO_ID: {
        type: Sequelize.INTEGER,
        references: { model: 'endereco', key: 'ENDERECO_ID' },
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('representante');
  },
};
