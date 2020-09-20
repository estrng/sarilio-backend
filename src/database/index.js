import 'dotenv/config';
import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import PF from '../app/models/PessoaFisica';
import PJ from '../app/models/PessoaJuridica';
import Ativo from '../app/models/Ativo';
import ContaAtivo from '../app/models/ContaAtivo';
import ContaBancaria from '../app/models/ContaBancaria';
import ContaInterna from '../app/models/ContaInterna';
import Endereco from '../app/models/Endereco';
import LivroDeOferta from '../app/models/LivroDeOferta';
import Categoria from '../app/models/Categoria';
import Qualificacao from '../app/models/Qualificacao';
import ClienteAtivo from '../app/models/ClienteAtivo';

import databaseConfig from '../config/database';

const models = [
  Usuario,
  PF,
  PJ,
  Ativo,
  ContaAtivo,
  ContaBancaria,
  ContaInterna,
  Endereco,
  LivroDeOferta,
  Categoria,
  Qualificacao,
  ClienteAtivo,
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
