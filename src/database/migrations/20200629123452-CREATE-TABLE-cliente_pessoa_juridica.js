module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cliente_pessoa_juridica', {
      PJ_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CNPJ: { type: Sequelize.STRING(18), unique: true },
      NOME_FANTASIA: Sequelize.STRING(60),
      RAZAO_SOCIAL: Sequelize.STRING(50),
      INSCRICAO_ESTADUAL: Sequelize.STRING(13),
      TELEFONE: Sequelize.STRING(14),
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('cliente_pessoa_juridica');
  },
};
