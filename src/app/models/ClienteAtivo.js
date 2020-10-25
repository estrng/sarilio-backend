import Sequelize, { Model } from 'sequelize';

class ClienteAtivo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        valor: Sequelize.FLOAT,
        quantidade: Sequelize.FLOAT,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
  }
}

export default ClienteAtivo;

// DATABASE Model de ClienteAtivo
