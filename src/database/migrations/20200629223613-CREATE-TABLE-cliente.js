module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cliente', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      status: { type: Sequelize.BOOLEAN, defaultValue: false },
      email: { type: Sequelize.STRING(100), unique: true, allowNull: false },
      senha_hash: { type: Sequelize.STRING, allowNull: false },
      tipo_de_cliente: { type: Sequelize.STRING, allowNull: true },

      conta_interna_id: {
        type: Sequelize.INTEGER,
        references: { model: 'conta_interna', key: 'id' },
      },

      endereco_id: {
        type: Sequelize.INTEGER,
        references: { model: 'endereco', key: 'id' },
      },

      conta_bancaria_id: {
        type: Sequelize.INTEGER,
        references: { model: 'conta_bancaria', key: 'id' },
      },

      representante_id: {
        type: Sequelize.INTEGER,
        references: { model: 'representante', key: 'id' },
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
    return queryInterface.dropTable('cliente');
  },
};
