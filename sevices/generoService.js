import Genero from '../models/genero';

const crearGenero = async (nombreGenero) => {
  try {
    const nuevoGenero = await Genero.create({ genero: nombreGenero });
    console.log('Género creado:', nuevoGenero);
  } catch (error) {
    console.error('Error al crear el género:', error);
  }
};