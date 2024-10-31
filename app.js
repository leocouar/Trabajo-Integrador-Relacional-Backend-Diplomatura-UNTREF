import express, { json } from 'express';
import contenidoRoutes from "./routes/contenidoRoutes.js"
import  db  from "./conexion/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(json());
app.use('/contenido', contenidoRoutes);

// Server
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

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