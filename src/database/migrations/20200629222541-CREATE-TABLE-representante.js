module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('representante', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nome: { type: Sequelize.STRING(150), allowNull: false },
      tipo_de_representacao: { type: Sequelize.STRING(60), allowNull: false },
      CPF: { type: Sequelize.STRING(14), unique: true, allowNull: false },
      endereco_id: {
        type: Sequelize.INTEGER,
        references: { model: 'endereco', key: 'id' },
      },
      created_at: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        defaultValue: new Date(),
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('representante');
  },
};
