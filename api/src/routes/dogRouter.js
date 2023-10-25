
const { Router } = require('express');
const { getDogs } = require('../controllers/getDogs');
const { getDogDetail } = require('../controllers/getDogDetail');
const { postDog } = require('../controllers/postDog');

const dogRouter = Router();

dogRouter.post('/', postDog);
dogRouter.get('/', getDogs);
dogRouter.get('/:idRaza', getDogDetail);

module.exports = dogRouter;