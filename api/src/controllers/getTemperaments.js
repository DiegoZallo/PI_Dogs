const {h_getTemperaments} = require('../handlers/h_getTemperaments');


const getTemperaments = async (req, res) => {
    try {
        const temperaments = await h_getTemperaments();
        if(Array.isArray(temperaments)){
            res.status(200).json(temperaments)
        }else{
            res.status(403).json({error: error.message})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }    
 };
  

  module.exports = {
    getTemperaments
  };