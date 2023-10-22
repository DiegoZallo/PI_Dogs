const axios = require('axios');
const {Dog} = require('../db');

//get the api key from .env file
require('dotenv').config();
const {api_key} = process.env;
//-------------------------------

const URL = `https://api.thedogapi.com/v1/breeds${api_key}`

const getDogs = async (req, res) => {
    try {
        const dogsApi = (await axios(URL)).data;
        const dogsDb = await Dog.findAll();
        const dogs = [...dogsApi, ...dogsDb];
        res.status(200).json(dogs)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
 };
  
  // ⚠️ No modificar nada debajo de esta línea ⚠️
  module.exports = {
    getDogs
  };