import { Viaje } from '../models/Viajes.js';
import { Sugerencias } from '../models/Sugerencias.js';

const paginaInicio = async (req, res) => {
    try {
        const [viajes, sugerencias] = await Promise.all([
            Viaje.findAll({ limit: 3 }),
            Sugerencias.findAll({ limit: 3 })
        ]);

        res.render('inicio', {
            pagina: 'Inicio',
            viajes,
            sugerencias,
            clase: 'home'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cargar la página de inicio');
    }
};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {
    try {
        const viajes = await Viaje.findAll();

        res.render('viajes', {
            pagina: 'Próximos Viajes',
            viajes
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cargar los viajes');
    }
};

const paginaSugerencias = async (req, res) => {
    try {
        const sugerencias = await Sugerencias.findAll({
            order: [['id', 'DESC']],
            limit: 50 // Mostrar hasta 50 sugerencias
        });

        console.log('📝 Sugerencias encontradas:', sugerencias.length); // Para debug

        res.render('sugerencias', {
            pagina: 'Sugerencias',
            sugerencias: sugerencias || [] // Asegurar que siempre sea un array
        });
    } catch (error) {
        console.log('❌ Error al cargar sugerencias:', error);
        res.status(500).send('Error al cargar las sugerencias');
    }
};

const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });

        if (!viaje) {
            return res.status(404).render('404', { pagina: 'Viaje no encontrado' });
        }

        res.render('viaje', {
            pagina: viaje.titulo,
            viaje
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cargar el viaje');
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaSugerencias,
    paginaDetalleViaje
};