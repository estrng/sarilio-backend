module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcionario', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: { type: Sequelize.STRING(150), allowNull: false },
      cpf: { type: Sequelize.STRING(14), unique: true, allowNull: false },
      rg: { type: Sequelize.STRING(20), allowNull: true },
      email: { type: Sequelize.STRING(255), unique: true, allowNull: false },
      senha_hash: { type: Sequelize.STRING(16), allowNull: false },
      endereco_id: {
        type: Sequelize.INTEGER,
        references: { model: 'endereco', key: 'id' },
        allowNull: true,
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
    return queryInterface.dropTable('funcionario');
  },
};
