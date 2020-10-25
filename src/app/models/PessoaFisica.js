import Sequelize, { Model } from 'sequelize';

class PessoaFisica extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: Sequelize.STRING,
        nome: Sequelize.STRING,
        data_de_nascimento: Sequelize.STRING,
        nome_da_mae: Sequelize.STRING,
        celular: Sequelize.STRING,
        genero: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default PessoaFisica;

// DATABASE Cliente pessoa fisica controller
