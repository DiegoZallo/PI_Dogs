const axios = require('axios');
const {Dog} = require('../db');

//get the api key from .env file
require('dotenv').config();
const {api_key} = process.env;
//-------------------------------

const URL = `https://api.thedogapi.com/v1/breeds`;
const URL_image = `https://cdn2.thedogapi.com/images/`;

const getDogDetail = async (req, res) => {
    try {
        const {id} = req.params;
        if(Number(id)){
            const {data} = await axios(`${URL}/${id}`);
            const dogsApi = {...data, weight: data.weight.metric, height: data.height.metric, image:`${URL_image}${data.reference_image_id}.jpg`}
            if(!dogsApi.id){
                return res.status(404).json({error: 'We couldn´t find dog information'})
            }               
            res.status(200).json(dogsApi)
        }else{
            const dogsDb = await Dog.findOne({where: {id: id}});
            if(!Dog){
                return res.status(404).json({error: 'We couldn´t find dog information'})
            }
            res.status(200).json(dogsDb)
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
 };
  
  // ⚠️ No modificar nada debajo de esta línea ⚠️
  module.exports = {
    getDogDetail
  };