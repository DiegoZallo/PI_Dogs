const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getDogs} = require('../controllers/getDogs')
const {getDogDetail} = require('../controllers/getDogDetail')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogDetail);


module.exports = router;
