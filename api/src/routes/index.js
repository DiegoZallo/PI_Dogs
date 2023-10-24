const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getDogs} = require('../controllers/getDogs');
const {getDogDetail} = require('../controllers/getDogDetail');
const {getTemperaments} = require('../controllers/getTemperaments');
const {postDog} = require('../controllers/postDog');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/dogs', postDog);
router.get('/dogs', getDogs);
router.get('/dogs/:idRaza', getDogDetail);
router.get('/temperaments', getTemperaments);



module.exports = router;
