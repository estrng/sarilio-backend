module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ativos', {
      ATIVO_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NOME_DO_ATIVO: Sequelize.STRING(50),
      VALOR: Sequelize.FLOAT,
      COMISSAO: Sequelize.FLOAT,
      QUANTIDADE_DISPONIVEL: Sequelize.FLOAT,
      TIPO: Sequelize.STRING(60),
      CREATED_AT: Sequelize.DATE,
      UPDATED_AT: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('ativos');
  },
};
