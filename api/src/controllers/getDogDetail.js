const {h_getDogDetail} = require('../handlers/h_getDogDetail')

const getDogDetail = async (req, res) => {
    try {
        const {idRaza} = req.params;
        const dogs = await h_getDogDetail(idRaza)
        res.status(200).json(dogs)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
 };
  
  module.exports = {
    getDogDetail
  };