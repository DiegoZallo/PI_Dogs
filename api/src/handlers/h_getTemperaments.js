const axios = require('axios');
const {Temperament} = require('../db');

//get the api key from .env file
require('dotenv').config();
const {api_key} = process.env;
//-------------------------------

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`;

const h_getTemperaments = async () => {
    let {data} = await axios(URL);

    if(Array.isArray(data)){
        let temList = [];
        await data.map((dog)=>{
            let auxTemts = dog.temperament?.split(', ');
            for(i=0; i<auxTemts?.length; i++){
                if(!temList.includes(auxTemts[i])){
                    temList.push(auxTemts[i]);
                    Temperament.findOrCreate({
                        where: { name: auxTemts[i] }, 
                        defaults: { name: auxTemts[i] }
                    });                  
                }
            }
        });

        return await temList  
        // return await Temperament.findAll()  

    }else{
        throw Error ("The was an error retreiving the data from the api request");
    }
 };

 module.exports = {
    h_getTemperaments
 };
