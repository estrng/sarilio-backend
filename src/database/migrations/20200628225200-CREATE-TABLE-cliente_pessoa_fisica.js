module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cliente_pessoa_fisica', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cpf: { type: Sequelize.STRING(14), unique: true, allowNull: false },
      nome: { type: Sequelize.STRING(150), allowNull: false },
      data_de_nascimento: { type: Sequelize.STRING(10), allowNull: true },
      nome_da_mae: { type: Sequelize.STRING(150), allowNull: true },
      celular: { type: Sequelize.STRING(14), allowNull: true },
      genero: { type: Sequelize.STRING(50), allowNull: true },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('cliente_pessoa_fisica');
  },
};
