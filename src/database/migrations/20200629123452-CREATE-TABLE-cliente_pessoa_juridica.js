module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cliente_pessoa_juridica', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cnpj: { type: Sequelize.STRING(18), unique: true, allowNull: false },
      nome_fantasia: { type: Sequelize.STRING(60), allowNull: true },
      razao_social: { type: Sequelize.STRING(50), allowNull: false },
      inscricao_estadual: { type: Sequelize.STRING(50), allowNull: true },
      telefone: { type: Sequelize.STRING(14), allowNull: true },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('cliente_pessoa_juridica');
  },
};
