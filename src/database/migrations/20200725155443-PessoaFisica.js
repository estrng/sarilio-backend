module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PessoaFisica', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      cpf: { type: Sequelize.STRING, unique: true, allowNull: false },
      nome: { type: Sequelize.STRING, allowNull: false },
      data_de_nascimento: { type: Sequelize.STRING, allowNull: true },
      nome_da_mae: { type: Sequelize.STRING, allowNull: true },
      celular: { type: Sequelize.STRING, allowNull: true },
      genero: { type: Sequelize.STRING, allowNull: true },

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
    return queryInterface.dropTable('PessoaFisica');
  },
};
