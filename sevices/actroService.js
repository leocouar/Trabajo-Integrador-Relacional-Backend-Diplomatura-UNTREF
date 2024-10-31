import Actor from '../models/actor';

const crearActor = async (nombre) => {
  try {
    const nuevoActor = await Actor.create({ nombre });
    console.log('Actor creado:', nuevoActor);
  } catch (error) {
    console.error('Error al crear el actor:', error);
  }
};