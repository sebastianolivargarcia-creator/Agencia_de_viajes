import Sequelize from 'sequelize';

const db = new Sequelize(
    'railway', // Nombre de la BD
    'root',    // Usuario
    'cMDCKwtUdNgfoGKyEtKAsYPyDKmNhsBH', // Contraseña
    {
        host: 'gondola.proxy.rlwy.net', // Host proporcionado por Railway
        port: 51055,                    // Puerto de Railway
        dialect: 'mysql',
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
);

export default db;
