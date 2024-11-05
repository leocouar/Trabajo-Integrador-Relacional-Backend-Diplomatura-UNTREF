// Model for Contenido
import { DataTypes,Model } from 'sequelize';
import sequelize from '../conexion/database.js';
import Categoria from './categoria.js';
import Genero from './genero.js';
import Actor from './actor.js';


/**
 * @swagger
 * components:
 *   schemas:
 *     Contenido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del contenido
 *           example: 1
 *         titulo:
 *           type: string
 *           description: Título del contenido
 *           example: "Contenido de ejemplo"
 *         resumen:
 *           type: string
 *           description: Resumen breve del contenido
 *           example: "Este es un breve resumen del contenido."
 *         poster:
 *           type: string
 *           description: URL del póster del contenido
 *           example: "URL_del_poster.jpg"
 *         categoriaId:
 *           type: integer
 *           description: ID de la categoría asociada
 *           example: 1
 *         gen:
 *           type: string
 *           description: Género específico del contenido
 *           example: "Drama"
 *         generos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genero'
 *           description: Lista de géneros asociados
 *         temporadas:
 *           type: integer
 *           description: Número de temporadas
 *           example: 2
 *         duracion:
 *           type: string
 *           description: Duración del contenido
 *           example: "2h 30m"
 *         busqueda:
 *           type: string
 *           description: Texto de búsqueda asociado
 *           example: "Texto de búsqueda"
 *         trailer:
 *           type: string
 *           description: URL del tráiler del contenido
 *           example: "URL_del_trailer.mp4"
 *         actores:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Actor'
 *           description: Lista de actores asociados
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la categoría
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría
 *           example: "Acción"
 *     Genero:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del género
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del género
 *           example: "Aventura"
 *     Actor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del actor
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del actor
 *           example: "John Doe"
 */
class Contenido extends Model {}

Contenido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temporadas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    busqueda: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Contenido',
    tableName: 'contenidos',
    timestamps: false,
  }
);

// Relaciones
Contenido.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Contenido.belongsToMany(Genero, { as: 'generos', through: 'ContenidoGenero', foreignKey: 'contenidoId', otherKey: 'generoId',timestamps: false });
Contenido.belongsToMany(Actor, { as:'actores', through: 'ContenidoActor', foreignKey: 'contenidoId', otherKey: 'actorId',timestamps: false });

export default Contenido;    