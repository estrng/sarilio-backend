import ClienteAtivo from '../models/ClienteAtivo';

class ClienteAtivoController {
  async index(req, res) {
    const AtivosDoCliente = await ClienteAtivo.findAll({
      where: { usuario_id: req.usuarioId },
    });

    return res.status(200).json(AtivosDoCliente);
  }
}

export default new ClienteAtivoController();
