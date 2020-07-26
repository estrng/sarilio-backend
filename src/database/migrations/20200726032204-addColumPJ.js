module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('PessoaJuridica', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropColumn('createdAt');
  },
};
