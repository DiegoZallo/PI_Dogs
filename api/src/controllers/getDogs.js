const axios = require('axios');
const {Dog} = require('../db');

//get the api key from .env file
require('dotenv').config();
const {api_key} = process.env;
//-------------------------------

const URL = `https://api.thedogapi.com/v1/breeds${api_key}`;
const URL_image = `https://cdn2.thedogapi.com/images/`;

const getDogs = async (req, res) => {
    try {
        const {data} = await axios(URL);
        const dogsApi = data.map((dog)=>{
            return dog = {...dog, weight: dog.weight.metric, height: dog.height.metric, image:`${URL_image}${dog.reference_image_id}.jpg`}
        })
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