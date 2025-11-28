import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

// Crear la app de Express
const app = express();

// Definir el puerto
const port = process.env.PORT || 3000;

// Conectar la base de datos
db.authenticate()
    .then(() => {
        console.log('✅ Base de datos conectada correctamente');
    })
    .catch(error => {
        console.log('❌ Error al conectar la base de datos:', error);
    });

// Habilitar Pug como motor de vistas
app.set('view engine', 'pug');

// Definir carpeta de vistas (opcional pero recomendado)
app.set('views', './views');

// Definir carpeta pública
app.use(express.static('public'));

// Habilitar lectura de datos del formulario (POST)
app.use(express.urlencoded({ extended: true }));

// Middleware para obtener el año actual y nombre del sitio
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
});

// Usar el router principal
app.use('/', router);

// Manejo de rutas 404
app.use((req, res) => {
    res.status(404).render('404', {
        pagina: 'Página no encontrada'
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
});