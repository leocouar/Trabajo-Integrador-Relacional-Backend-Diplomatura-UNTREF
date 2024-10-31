import { Sequelize } from 'sequelize';
process.loadEnvFile()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,  
    dialect: process.env.DB_DIALECT   
} )

sequelize.authenticate()
    .then(() => console.log(`Conectado a la base de datos ${process.env.DB_DIALECT}`))
    .catch(err => console.log('No se pudo conectar a la base de datos', err))

export default sequelize;
    