import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import Controllers from './modulos/controllers';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json('Server is runnig!');
});

// USUARIO ROTAS
routes.post('/usuario', Controllers.Usuario.store);

// SESSOES ROTAS
routes.post('/sessions', Controllers.Session.store);

// MIDDLEWARE ROTAS
routes.use(authMiddleware);
routes.get('/info', Controllers.Usuario.index);
routes.get('/usuario', Controllers.Usuario.show);

// QUALIFICACAO ROTAS
routes.post('/qualificacao', Controllers.Qualificacao.store);

// REGISTRO ROTAS
routes.post('/pj', Controllers.PJ.store);
routes.post('/pf', Controllers.PF.store);

// ATIVO ROTAS
routes.post('/ativos', Controllers.Ativo.store);
routes.get('/ativos', Controllers.Ativo.index);
routes.get('/meusativos', Controllers.ClienteAtivo.index);
routes.get('/meusativos/:id', Controllers.ClienteAtivo.show);

// ATIVOS Cliente
routes.post('/ask', Controllers.CompraAtivo.store);

// CONTAATIVO ROTAS
routes.post('/bind', Controllers.CompraAtivo.bind);

// ACCBANCARIA ROTAS
routes.post('/accban', Controllers.ContaBancaria.store);
routes.get('/accban', Controllers.ContaBancaria.index);
routes.post('/delaccban', Controllers.ContaBancaria.delete);

// CONTAINTERNA ROTAS
routes.post('/accint', Controllers.ContaInterna.store);
routes.get('/accint', Controllers.ContaInterna.index);

// ENDERECO ROTAS
routes.post('/end', Controllers.Endereco.store);
routes.get('/end', Controllers.Endereco.index);

// LIVRODEOFERTAS ROTAS
routes.post('/book', Controllers.LivroDeOferta.store);
routes.get('/book', Controllers.LivroDeOferta.index);

// MANUTENCAO Clientes
routes.post('/manutencao', Controllers.Manutencao.updatedStatus);

// CATEGORIA ROTAS
routes.post('/coincat', Controllers.Categoria.store);

// FAKEDEPOST fake deposito
routes.post('/deposito', Controllers.FakeDeposito.store);

export default routes;
