const axios = require('axios');
const {Dog} = require('../db');

//get the api key from .env file
require('dotenv').config();
const {api_key} = process.env;
//-------------------------------

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`;

const h_getDogs = async () => {
    let {data} = await axios(URL);

    if(Array.isArray(data)){
        const dogsApi = data.map((dog)=>{
            return dog = {...dog, 
                weight: dog.weight.metric, 
                height: dog.height.metric, 
                image: dog.image.url}
        });

        const dogsDb = await Dog.findAll();
        const dogs = [...dogsApi, ...dogsDb];

        return dogs

    }else{
        throw Error ("The was an error retreiving the data from the api request");
    }
 };
  
 
  module.exports = {
    h_getDogs
  };