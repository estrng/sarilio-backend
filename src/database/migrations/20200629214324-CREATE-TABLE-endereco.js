module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('endereco', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      cep: { type: Sequelize.STRING(9), allowNull: false },
      logradouro: { type: Sequelize.STRING(100), allowNull: true },
      numero: { type: Sequelize.STRING(10), allowNull: true },
      complemento: { type: Sequelize.STRING(60), allowNull: true },
      bairro: { type: Sequelize.STRING(60), allowNull: true },
      localidade: { type: Sequelize.STRING(100), allowNull: true },
      uf: { type: Sequelize.STRING(2), allowNull: true },
      unidade: { type: Sequelize.STRING(100), allowNull: true },
      ibge: { type: Sequelize.STRING(8), allowNull: true },
      gia: { type: Sequelize.STRING(5), allowNull: true },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('endereco');
  },
};
