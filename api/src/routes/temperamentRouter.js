const { Router } = require('express');
const { getTemperaments } = require('../controllers/getTemperaments');

const temperamentRouter = Router();

temperamentRouter.get('/', getTemperaments);

module.exports = temperamentRouter;