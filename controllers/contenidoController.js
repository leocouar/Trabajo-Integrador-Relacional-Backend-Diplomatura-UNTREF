import contenidosService from "../sevices/contenidoService.js"

class ContenidoController {
  // Método para obtener todos los contenidos
  async GetContenidos(req, res) {
    try {
      const contenidos = await contenidosService.getAll();
      res.status(200).json(contenidos); 
    } catch (error) {
      console.error('Error al obtener los contenidos:', error);
      res.status(500).json({ error: 'Error al obtener los contenidos.' });
    }
  }

  async GetContenidoById(req, res) {
    try {
      const { id } = req.params;
      const contenido = await contenidosService.getById(id);
      if (!contenido) {
        return res.status(404).json({ error: 'Contenido no encontrado' });
      }
      res.status(200).json(contenido); 
    } catch (error) {
      console.error('Error al obtener el contenido:', error);
      res.status(500).json({ error: 'Error al obtener el contenido.' });
    }
  }

  async GetContenidosByCondicion(req,res) {
    const { titulo, generoId, categoriaId } = req.query;
    try {
      const contenido = await contenidosService.getByfilter(titulo, generoId, categoriaId);
      res.status(200).json(contenido); 
    } catch (error) {
      console.error('Error al obtener el contenido:', error);
      res.status(500).json({ error: 'Error al obtener el contenido.' });
    }
  }
  async saveContenido(req, res) {
    const { titulo, resumen, poster, categoriaId, gen, generoIds, temporadas, duracion, busqueda, trailer, actorIds } = req.body;
    try {
      const nuevoContenido = await contenidosService.save(
        { titulo, resumen, poster, categoriaId, gen, generoIds, temporadas, duracion, busqueda, trailer, actorIds },
      );
      res.status(201).json(nuevoContenido);
    } catch (error) {
      console.error('Error al crear el contenido:', error);
      res.status(500).json({ error: 'Error al crear el contenido.' });
    }
  }

  async eliminarContenido(req, res) {
    const { id } = req.params;

    try {
      const contenido = await contenidosService.getById(id);
      if (!contenido) {
        return res.status(404).json({ error: 'Contenido no encontrado' });
      }
      await contenidosService.deleteContenido(id);
      res.status(200).json({ message: 'Contenido y sus relaciones eliminados correctamente' });
    } catch (error) {
      console.error('Error al eliminar el contenido:', error);
      res.status(500).json({ error: 'Error al eliminar el contenido' });
    }
  }

  async actualizarContenido(req, res) {
    const { id } = req.params;
    const contenidoData = req.body;

    try {
      const contenido = await contenidosService.getById(id);

      if (!contenido) {
        return res.status(404).json({ error: 'Contenido no encontrado' });
      }

      const newcontenido = await contenidosService.updateContenido(id,contenidoData);

      res.json({ message: 'Contenido actualizado correctamente', newcontenido });
    } catch (error) {
      console.error('Error al actualizar el contenido:', error);
      res.status(500).json({ error: 'Error al actualizar el contenido' });
    }
  }
}

export default new ContenidoController();