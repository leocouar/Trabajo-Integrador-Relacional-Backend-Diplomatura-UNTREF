// Model for Contenido
import { DataTypes,Model } from 'sequelize';
import sequelize from '../conexion/database.js';
import Categoria from './categoria.js';
import Genero from './genero.js';
import Actor from './actor.js';

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