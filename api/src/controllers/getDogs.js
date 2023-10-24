//Handlers
const {h_getDogs} = require('../handlers/h_getDogs');
const {h_getDogsByName} = require('../handlers/h_getDogsByName');


const getDogs = async (req, res) => {
    const {name} = req.query;
   
    try {
        const dogs = await h_getDogs();
        if(!name){
            res.status(200).json(dogs)
        }else{
            const dogsByName = await h_getDogsByName(name, dogs);
            res.status(200).json(dogsByName)
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }    
 };
  
  // ⚠️ No modificar nada debajo de esta línea ⚠️
  module.exports = {
    getDogs
  };