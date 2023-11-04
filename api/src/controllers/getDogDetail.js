const {h_getDogDetail} = require('../handlers/h_getDogDetail')

const getDogDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const dogs = await h_getDogDetail(id)
        res.status(200).json(dogs)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
 };
  
  module.exports = {
    getDogDetail
  };