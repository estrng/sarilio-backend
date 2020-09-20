module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ContaAtivo', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropColumn('updatedAt');
  },
};
