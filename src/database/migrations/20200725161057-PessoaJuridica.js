module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PessoaJuridica', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      cnpj: { type: Sequelize.STRING, unique: true, allowNull: false },
      nome_fantasia: { type: Sequelize.STRING, allowNull: true },
      razao_social: { type: Sequelize.STRING, allowNull: false },
      inscricao_estadual: { type: Sequelize.STRING, allowNull: true },
      telefone: { type: Sequelize.STRING, allowNull: true },

      usuario_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Usuario', key: 'id' },
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('PessoaJuridica');
  },
};
