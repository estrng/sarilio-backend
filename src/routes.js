import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import Controllers from './modulos/controllers';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

// ROTAS CLIENTE

routes.post('/usuario', Controllers.Usuario.store);

// ROTAS Sessões

routes.post('/sessions', Controllers.Session.store);

routes.use(authMiddleware);

// ROTAS CLIENTE PJ

// ROTAS ATIVO

// ROTAS CONTA ATIVO

// ROTAS CONTA BANCARIA

// ROTAS CONTA INTERNA

// ROTAS ENDERECO

// ROTAS LIVRO DE OFERTAS

export default routes;
