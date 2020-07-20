import Sequelize, { Model } from 'sequelize';

class Representante extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        tipo_de_representacao: Sequelize.STRING,
        CPF: Sequelize.STRING,
        endereco_id: {
          type: Sequelize.INTEGER,
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate() {}
}

export default Representante;
