const {Dog, Temperament} = require('../db');
const {h_postDog} = require('../handlers/h_postDog')

const postDog = async (req, res) => {
    const {name, image, height, weight, life_span, temperament} = req.body;
    
    try {
        if(!name || !image || !height || !weight || !life_span || !Array.isArray(temperament)){
            return res.status(400).json({error:"Some data is missing"})
        }
        await h_postDog({name, image, height, weight, life_span, temperament});
        
        res.status(200).json("Dog created successfully!");

    } catch (error) {
        res.status(500).json({error: error.message})
    }
};



module.exports = {
    postDog
}