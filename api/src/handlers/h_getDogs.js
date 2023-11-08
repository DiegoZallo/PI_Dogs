const axios = require('axios');
const {Dog, Temperament} = require('../db');

require('dotenv').config();
const {api_key} = process.env;


const URL = `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`;

const h_getDogs = async () => {
    let {data} = await axios(URL);

    if(Array.isArray(data)){
        const dogsApi = data.map((dog)=>{
            return dog = {...dog, 
                weight: dog.weight.metric, 
                height: dog.height.metric, 
                image: dog.image.url,
                temperament: dog.temperament?.split(', ')
            }
        });

        let dogsDb = await Dog.findAll({
            include:{model: Temperament}});

        if(!dogsDb) throw Error ("The was an error retreiving the data from the DB request");
        
        dogsDb = dogsDb?.map((dog)=>{
            let auxTemp = dog.temperaments?.map((temp)=>temp.name)
            
            let dogs ={
                weight: dog.weight,
                height: dog.height,
                id: dog.id,
                name: dog.name,
                life_span: dog.life_span,
                temperament: auxTemp,
                image: dog.image}
                
            return dogs
        })
        
        const resDogs = [...dogsApi, ...dogsDb];

        return resDogs

    }else{
        throw Error ("The was an error retreiving the data from the api request");
    }
 };
  
 
  module.exports = {
    h_getDogs
  };