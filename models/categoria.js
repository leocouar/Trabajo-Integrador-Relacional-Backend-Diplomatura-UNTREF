// Model for Categoria
import { DataTypes,Model } from 'sequelize';
import sequelize from '../conexion/database.js';

class Categoria extends Model {}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false, // No puede ser nulo
    },
  },
  {
    sequelize,
    modelName: 'Categoria', // Nombre del modelo
    tableName: 'categorias', // Nombre de la tabla en la base de datos
    timestamps: false, // Cambia a true si deseas usar createdAt y updatedAt
  }
);

export default Categoria;