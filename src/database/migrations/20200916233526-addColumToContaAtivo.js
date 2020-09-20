module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ContaAtivo', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropColumn('createdAt');
  },
};
