import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME,
     process.env.DB_USER,
     process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT   
    } )

sequelize.authenticate()
    .then(() => console.log(`Conectado a la base de datos ${process.env.DB_DIALECT}`))
    .catch(err => console.log('No se pudo conectar a la base de datos', err))

export default sequelize;
    