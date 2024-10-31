import express from 'express';
const router = express.Router();
import ContenidoControler from "../controllers/contenidoController.js"

// Routes for CRUD
router.get('/', ContenidoControler.GetContenidos);

router.get('/filter', ContenidoControler.GetContenidosByCondicion)

router.get('/:id',ContenidoControler.GetContenidoById);

router.post('/', ContenidoControler.saveContenido);

router.put('/:id', ContenidoControler.actualizarContenido);

router.delete('/:id', ContenidoControler.eliminarContenido);

export default router;
    