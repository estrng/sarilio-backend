import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // NOTE achar uma maneira de fazer login do Funcionario

    req.usuarioId = decoded.id;

    // NOTE talvez aqui de para fazer uma validação de usu, func e rep.

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
