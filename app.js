import express, { json } from 'express';
import contenidoRoutes from "./routes/contenidoRoutes.js"
import  db  from "./conexion/database.js";
import errorHandler from './middleware/errorHandler.js';
import setupSwagger from './config/swagger.js';
import dotenv from 'dotenv';
dotenv.config

const app = express();
const PORT = process.env.PORT || 3000;


app.use(json());
app.use('/contenido', contenidoRoutes);

setupSwagger(app);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use((req, res, next) => {
  const error = new Error("Recurso no encontrado");
  error.status = 404;
  next(error);
});

app.use(errorHandler)
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