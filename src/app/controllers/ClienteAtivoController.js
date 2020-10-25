import Ativo from '../models/Ativo';
import ClienteAtivo from '../models/ClienteAtivo';

class ClienteAtivoController {
  async index(req, res) {
    const AtivosDoCliente = await ClienteAtivo.findAll({
      where: { usuario_id: req.usuarioId },
    });

    return res.status(200).json(AtivosDoCliente);
  }

  async show(req, res) {
    const { id } = req.params;

    const ativo = await ClienteAtivo.findByPk(id);

    if (!ativo) {
      return res.status(400).json({ message: 'Nothing found.' });
    }
    return res.status(200).json(ativo);
  }
}

export default new ClienteAtivoController();
