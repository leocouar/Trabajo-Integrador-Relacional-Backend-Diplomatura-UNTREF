// Model for Genero
import { DataTypes,Model } from 'sequelize';
import sequelize from '../conexion/database.js';

class Genero extends Model {}

Genero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Genero',
    tableName: 'generos',
    timestamps: false,
  }
);

export default Genero;