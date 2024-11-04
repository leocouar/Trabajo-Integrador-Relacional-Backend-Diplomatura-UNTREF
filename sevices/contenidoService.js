import Contenido from "../models/contenido.js";
import Categoria from "../models/categoria.js";
import Genero from "../models/genero.js";
import Actor from "../models/actor.js";
import sequelize from "../conexion/database.js";

const getAll = async () => {
  try {
    const contenidos = await Contenido.findAll({
      include: [
        {
          model: Categoria,
          as: "categoria",
        },
        {
          model: Genero,
          as: "generos",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actores",
          through: { attributes: [] },
        },
      ],
    });
    return contenidos;
  } catch (error) {
    throw new Error("Error al obtener el contenido");
  }
};

const getById = async (id) => {
  try {
    const contenido = await Contenido.findByPk(id,{
      include: [
        {
          model: Categoria,
          as: "categoria",
        },
        {
          model: Genero,
          as: "generos",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actores",
          through: { attributes: [] },
        },
      ],
    });
    return contenido;
  } catch (error) {
    throw new Error("Error al obtener el contenido");
  }
};

const save = async (contenidoData) => {
  const transaction = await sequelize.transaction();
  try {
    const nuevoContenido = await Contenido.create(contenidoData, {
      transaction,
    });
    if (contenidoData.actorIds && contenidoData.actorIds.length > 0) {
      const actores = await Actor.findAll({
        where: { id: contenidoData.actorIds },
        transaction,
      });
      await nuevoContenido.addActores(actores, { transaction });
    }
    if (contenidoData.generoIds && contenidoData.generoIds.length > 0) {
      const generos = await Genero.findAll({
        where: { id: contenidoData.generoIds },
        transaction,
      });
      await nuevoContenido.addGeneros(generos, { transaction });
    }


    await transaction.commit();
    return nuevoContenido;
  } catch (error) {
    await transaction.rollback();
    throw new Error("Error al crear el contenido");
  }

};
const deleteContenido = async (id) =>{
  try {
    const contenido = await Contenido.findByPk(id, {
      include: [
        {
          model: Genero,
          as: 'generos',
        },
        {
          model: Actor,
          as: 'actores',
        },
      ],
    });

    if (!contenido) {
      return null;
    }

    await contenido.setGeneros([]);
    await contenido.setActores([]);
    await contenido.destroy();
  }catch{
    throw new Error("Error al eliminar el contenido");
  }
}

const updateContenido = async (id,contenidoData) =>{
  try {
    const contenido = await Contenido.findByPk(id,{
      include: [
        {
          model: Categoria,
          as: "categoria",
        },
        {
          model: Genero,
          as: "generos",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actores",
          through: { attributes: [] },
        },
      ],
    });
    await contenido.update(contenidoData)
          // Actualiza las relaciones muchos a muchos
    if (contenidoData.generoIds) {
      const generos = await Genero.findAll({ where: { id: contenidoData.generoIds } });
      await contenido.setGeneros(generos); // Establece nuevas relaciones
    }

    if (contenidoData.actorIds) {
      const actores = await Actor.findAll({ where: { id: contenidoData.actorIds } });
      await contenido.setActores(actores); // Establece nuevas relaciones
    }
    return contenido
  } catch (error) {
    throw new Error("Error al Actualiz el contenido");
  }
}
const getByfilter = async (titulo, generoId, categoriaId) =>{
  try {
    const whereConditions = {};
      if (titulo) {
        whereConditions.titulo = {
          [Op.like]: `%${titulo}%`,
        };
      }
      if (generoId) {
        whereConditions['$generos.id$'] = generoId;
      }
      if (categoriaId) {
        whereConditions['$categoria.id$'] = categoriaId;
      }
      const contenidos = await Contenido.findAll({
        where: whereConditions,
        include: [
          {
            model: Categoria,
            as: "categoria",
          },
          {
            model: Genero,
            as: "generos",
            through: { attributes: [] },
          },
          {
            model: Actor,
            as: "actores",
            through: { attributes: [] },
          },
        ],
      });
      return contenidos
  } catch (error) {
    throw new Error("Error al obtener el contenido");
  }
}
export default { getAll, save, getById,deleteContenido,updateContenido, getByfilter};
