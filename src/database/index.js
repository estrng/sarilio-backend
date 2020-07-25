import 'dotenv/config';
import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import PF from '../app/models/PessoaFisica';
import PJ from '../app/models/PessoaJuridica';
import Ativo from '../app/models/Ativo';
import OfertaAtivo from '../app/models/OfertaAtivo';
import ContaBancaria from '../app/models/ContaBancaria';
import ContaInterna from '../app/models/ContaInterna';
import Endereco from '../app/models/Endereco';
import LivroDeOferta from '../app/models/LivroDeOferta';
import Categoria from '../app/models/Categoria';
import Qualificacao from '../app/models/Qualificacao';

import databaseConfig from '../config/database';

const models = [
  Usuario,
  PF,
  PJ,
  Ativo,
  OfertaAtivo,
  ContaBancaria,
  ContaInterna,
  Endereco,
  LivroDeOferta,
  Categoria,
  Qualificacao,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

// DATABASE - Registro de models
