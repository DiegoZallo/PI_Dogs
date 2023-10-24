const axios = require('axios');
const {Dog, Temperament} = require('../db');

//get the api key from .env file
require('dotenv').config();
const {api_key} = process.env;
//-------------------------------

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`;

const h_getDogDetail = async (idRaza) => {

    if(Number(idRaza)){

        let {data} = await axios(URL);
        if(!Array.isArray(data)){
            throw Error('We had a ploblem accesing the database')
        }   
        data = data.filter((dog)=>{
            return dog.id == idRaza
        })
        if(data.length !== 1){
            throw Error('there was a problem retreivind dog detail')
        }        
        const dogsApi = {...data[0], 
            weight: data[0].weight.metric, 
            height: data[0].height.metric, 
            image: data[0].image.url
        }
    
        return dogsApi
    }else{
        const dogsDb = await Dog.findOne(
            {where: {id: idRaza},
             include:{model: Temperament}                             });
        if(!Dog){
            throw Error('We couldn´t find dog information')
        }
        return dogsDb
    }
 };
  
 
  module.exports = {
    h_getDogDetail
  };