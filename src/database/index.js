import 'dotenv/config';
import Sequelize from 'sequelize';

import Cliente from '../app/models/Cliente';
import ClientePessoaFisica from '../app/models/ClientePessoaFisica';
import ClientePessoaJuridica from '../app/models/ClientePessoaJuridica';
import Ativo from '../app/models/Ativo';
import ContaAtivo from '../app/models/ContaAtivo';
import ContaBancaria from '../app/models/ContaBancaria';
import ContaInterna from '../app/models/ContaInterna';
import Endereco from '../app/models/Endereco';
import Funcionario from '../app/models/Funcionario';
import Representante from '../app/models/Representante';
import LivroDeOferta from '../app/models/LivroDeOferta';

import databaseConfig from '../config/database';

const models = [
  Cliente,
  ClientePessoaFisica,
  ClientePessoaJuridica,
  Ativo,
  ContaAtivo,
  ContaBancaria,
  ContaInterna,
  Endereco,
  Funcionario,
  Representante,
  LivroDeOferta,
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
