// Model for Actor
import { DataTypes,Model } from 'sequelize';
import sequelize from '../conexion/database.js';

class Actor extends Model {}

Actor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false, // No puede ser nulo
    },
  },
  {
    sequelize,
    modelName: 'Actor',
    tableName: 'actores',
    timestamps: false,
  }
);

export default Actor
