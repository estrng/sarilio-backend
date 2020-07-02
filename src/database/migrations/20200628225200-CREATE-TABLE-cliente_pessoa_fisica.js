module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cliente_pessoa_fisica', {
      PESSOA_FISICA_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CPF: { type: Sequelize.STRING(14), unique: true },
      NOME: Sequelize.STRING(150),
      DATA_DE_NASCIMENTO: Sequelize.STRING(10),
      NOME_DA_MAE: Sequelize.STRING(150),
      CELULAR: Sequelize.STRING(14),
      GENERO: Sequelize.STRING(50),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('cliente_pessoa_fisica');
  },
};
