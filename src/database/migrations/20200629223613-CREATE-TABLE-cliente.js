module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cliente', {
      CLIENTE_ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      STATUS: { type: Sequelize.BOOLEAN, defaultValue: false },
      EMAIL: { type: Sequelize.STRING(100), unique: true },
      SENHA_HASH: Sequelize.STRING(16),
      TIPO_DE_CLIENTE: Sequelize.STRING,

      CONTA_INTERNA_ID: {
        type: Sequelize.INTEGER,
        references: { model: 'conta_interna', key: 'CONTA_ID' },
      },

      ENDERECO_ID: {
        type: Sequelize.INTEGER,
        references: { model: 'endereco', key: 'ENDERECO_ID' },
      },

      CONTA_BANCARIA_ID: {
        type: Sequelize.INTEGER,
        references: { model: 'conta_bancaria', key: 'CONTA_BANCARIA_ID' },
      },

      REPRESENTANTE_ID: {
        type: Sequelize.INTEGER,
        references: { model: 'representante', key: 'REPRESENTANTE_ID' },
      },

      CREATED_AT: { type: Sequelize.DATE, allowNull: false },
      UPDATED_AT: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('cliente');
  },
};
