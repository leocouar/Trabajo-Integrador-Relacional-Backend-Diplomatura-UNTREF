import express from 'express';
const router = express.Router();
import ContenidoControler from "../controllers/contenidoController.js"

/**
 * @swagger
 * /contenido:
 *   get:
 *     summary: Obtiene todos los contenidos
 *     tags: [Contenido]
 *     responses:
 *       200:
 *         description: Lista de contenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Ejemplo de contenido"
 */
router.get('/', ContenidoControler.GetContenidos);

/**
 * @swagger
 * /filter:
 *   get:
 *     summary: Filtra contenidos según título, categoría y género
 *     tags: [Contenido]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Título del contenido
 *       - in: query
 *         name: categoriaId
 *         schema:
 *           type: integer
 *         description: ID de la categoría del contenido
 *       - in: query
 *         name: generoId
 *         schema:
 *           type: integer
 *         description: ID del género asociado al contenido
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Ejemplo de contenido"
 *                   categoriaId:
 *                     type: integer
 *                     example: 1
 *                   generoId:
 *                     type: integer
 *                     example: 3
 */
router.get('/filter', ContenidoControler.GetContenidosByCondicion)

/**
 * @swagger
 * /contenido/{id}:
 *   get:
 *     summary: Obtiene un contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contenido
 *     responses:
 *       200:
 *         description: Contenido obtenido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: "Ejemplo de contenido"
 */
router.get('/:id',ContenidoControler.GetContenidoById);

/**
 * @swagger
 * /contenido:
 *   post:
 *     summary: Crea un nuevo contenido
 *     tags: [Contenido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Contenido Nuevo"
 *               resumen:
 *                 type: string
 *                 example: "Breve resumen del contenido"
 *               poster:
 *                 type: string
 *                 example: "URL_del_poster.jpg"
 *               categoriaId:
 *                 type: integer
 *                 example: 1
 *               gen:
 *                 type: string
 *                 example: "Algun género específico"
 *               generoIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               temporadas:
 *                 type: integer
 *                 example: 2
 *               duracion:
 *                 type: string
 *                 example: "2h 30m"
 *               busqueda:
 *                 type: string
 *                 example: "Texto de búsqueda asociado"
 *               trailer:
 *                 type: string
 *                 example: "URL_del_trailer.mp4"
 *               actorIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Contenido creado
 */
router.post('/', ContenidoControler.saveContenido);

/**
 * @swagger
 * /contenido/{id}:
 *   put:
 *     summary: Actualiza un contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contenido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Contenido actualizado"
 *     responses:
 *       200:
 *         description: Contenido actualizado
 */
router.put('/:id', ContenidoControler.actualizarContenido);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Elimina un contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contenido
 *     responses:
 *       200:
 *         description: Contenido eliminado
 */
router.delete('/:id', ContenidoControler.eliminarContenido);

export default router;
    