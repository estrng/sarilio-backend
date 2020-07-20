import { Router } from 'express';

import ClienteController from './app/controllers/ClienteController';
import ClientePFController from './app/controllers/ClientePessoaFisicaController';
import ClientePJController from './app/controllers/ClientePJController';
import AtivoController from './app/controllers/AtivoController';
import ContaAtivoController from './app/controllers/ContaAtivoController';
import ContaBancariaController from './app/controllers/ContaBancariaController';
import ContaInternaController from './app/controllers/ContaInternaController';
import EnderecoController from './app/controllers/EndereceController';
import FuncionarioController from './app/controllers/FuncionarioController';
import RepresentanteController from './app/controllers/RepresentanteController';
import LivroDeOfertaController from './app/controllers/LivroDeOfertaController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

// ROTAS CLIENTE
routes.post('/cliente', ClienteController.store);
routes.post('/clientepf', ClientePFController.store);
// ROTAS CLIENTE PJ
routes.post('/clientepj', ClientePJController.store);
// ROTAS ATIVO
routes.post('/ativos', AtivoController.store);
// ROTAS CONTA ATIVO
routes.post('/accativos', ContaAtivoController.store);
// ROTAS CONTA BANCARIA
routes.post('/accban', ContaBancariaController.store);
// ROTAS CONTA INTERNA
routes.post('/accint', ContaInternaController.store);
// ROTAS ENDERECO
routes.post('/end', EnderecoController.store);
// ROTAS LIVRO DE OFERTAS
routes.post('/book', LivroDeOfertaController.store);
// ROTAS FUNCIONARIO
routes.post('/func', FuncionarioController.store);
// ROTAS REPRESENTANTE
routes.post('/rep', RepresentanteController.store);

export default routes;
