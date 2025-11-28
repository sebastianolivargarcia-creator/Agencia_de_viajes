import { Sugerencias } from '../models/Sugerencias.js';

const guardarSugerencia = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    const errores = [];
    if (!nombre || !nombre.trim()) errores.push({ mensaje: 'El nombre es obligatorio' });
    if (!correo || !correo.trim()) errores.push({ mensaje: 'El correo es obligatorio' });
    if (!mensaje || !mensaje.trim()) errores.push({ mensaje: 'El mensaje no puede estar vacío' });

    if (errores.length > 0) {
        const sugerencias = await Sugerencias.findAll({
            order: [['id', 'DESC']],
            limit: 50
        });

        return res.render('sugerencias', {
            pagina: 'Sugerencias',
            errores,
            nombre: nombre || '',
            correo: correo || '',
            mensaje: mensaje || '',
            sugerencias: sugerencias || []
        });
    }

    try {
        await Sugerencias.create({
            nombre: nombre.trim(),
            correo: correo.trim(),
            mensaje: mensaje.trim()
        });

        console.log('✅ Sugerencia guardada correctamente');
        res.redirect('/sugerencias');
    } catch (error) {
        console.log('❌ Error al guardar sugerencia:', error);
        res.status(500).send('Error al guardar la sugerencia');
    }
};

export { guardarSugerencia };