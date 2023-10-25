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
            image: data[0].image.url,
            temperament: data[0].temperament.split(', ')
        }
    
        return dogsApi
    }else{

        let dogsDb = await Dog.findByPk(idRaza,
            {include: Temperament});

        if(!dogsDb){
            throw Error('We couldn´t find dog information')
        }
        const auxTemp = dogsDb.temperaments.map((temp)=>temp.name)
        
        const dogs ={
            weight: dogsDb.weight,
            height: dogsDb.height,
            id: dogsDb.id,
            name: dogsDb.name,
            life_span: dogsDb.life_span,
            temperament: auxTemp,
            image: dogsDb.image
        }
        

        return dogs
    }
 };
  
 
  module.exports = {
    h_getDogDetail
  };