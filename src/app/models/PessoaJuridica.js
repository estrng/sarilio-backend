import Sequelize, { Model } from 'sequelize';

class PessoaJuridica extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        nome_fantasia: Sequelize.STRING,
        razao_social: Sequelize.STRING,
        inscricao_estadual: Sequelize.STRING,
        telefone: Sequelize.STRING,
      },
      { sequelize }
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

export default PessoaJuridica;
