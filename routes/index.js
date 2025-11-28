import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaDetalleViaje,
  paginaSugerencias
} from '../controllers/paginaController.js';

import { guardarSugerencia } from '../controllers/sugerenciasController.js';

const router = express.Router();

// Rutas GET
router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);
router.get('/sugerencias', paginaSugerencias);

// Rutas POST
router.post('/sugerencias', guardarSugerencia);

export default router;