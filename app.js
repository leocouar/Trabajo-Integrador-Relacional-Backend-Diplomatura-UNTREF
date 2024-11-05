import express, { json } from 'express';
import contenidoRoutes from "./routes/contenidoRoutes.js"
import  db  from "./conexion/database.js";
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(json());
app.use('/contenido', contenidoRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use((req, res, next) => {
  const error = new Error("Recurso no encontrado");
  error.status = 404;
  next(error); // Pasa el error al manejador de errores
});

app.use(errorHandler)
// Sincronizar modelos y levantar el servidor
const startServer = async () => {
  try {
    await db.sync(); // Sincroniza los modelos con la base de datos
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();