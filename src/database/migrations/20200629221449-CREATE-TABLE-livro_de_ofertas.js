module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('livro_de_ofertas', {
      ORDER_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      TIPO_DE_ORDEM: Sequelize.STRING(50),
      ATIVO: Sequelize.STRING(60),
      PRECO_LIMITE: Sequelize.FLOAT,
      VALOR_TOTAL: Sequelize.FLOAT,
      COMISSAO: Sequelize.FLOAT,
      QUANTIDADE: Sequelize.FLOAT,
      STATUS: Sequelize.STRING(50),
      CREATED_AT: { type: Sequelize.DATE, allowNull: false },
      UPDATED_AT: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('livro_de_ofertas');
  },
};
