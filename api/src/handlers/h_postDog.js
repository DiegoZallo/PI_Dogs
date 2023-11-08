const {Dog, Temperament} = require('../db');

const h_postDog = async ({ name, image, height, weight, life_span, temperament }) => {
    const [newDog, created] = await Dog.findOrCreate({
        where: { name, image, height, weight, life_span }
    });

    if (created) {
        const result = await newDog.addTemperament(temperament);
        if (result.length !== temperament.length) {
            throw new Error( "Failed to associate Temperaments" );
        }
    } else {
        throw new Error( "Dog already exists" );
    } 
 };
   
  module.exports = {
    h_postDog
  };