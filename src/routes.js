import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import Controllers from './modulos/controllers';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json('Server is runnig!');
});

// ROTAS USUARIO
routes.post('/usuario', Controllers.Usuario.store);

// ROTAS Sessões
routes.post('/sessions', Controllers.Session.store);

routes.use(authMiddleware);
routes.post('/qualificacao', Controllers.Qualificacao.store);

// ROTAS REGISTRO
routes.post('/pj', Controllers.PJ.store);
routes.post('/pf', Controllers.PF.store);
// ROTAS ATIVO

// ROTAS CONTA ATIVO

// ROTAS CONTA BANCARIA
routes.post('/accban', Controllers.ContaBancaria.store);
// ROTAS CONTA INTERNA

// ROTAS ENDERECO

// ROTAS LIVRO DE OFERTAS

export default routes;
