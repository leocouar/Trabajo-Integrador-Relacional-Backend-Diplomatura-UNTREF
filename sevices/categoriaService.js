import Categoria from '../models/categoria';

const crearCategoria = async (nombreCategoria) => {
  try {
    const nuevaCategoria = await Categoria.create({ categoria: nombreCategoria });
    console.log('Categoría creada:', nuevaCategoria);
  } catch (error) {
    console.error('Error al crear la categoría:', error);
  }
};