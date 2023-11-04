const {h_deleteDog} = require('../handlers/h_deleteDog')
const {h_getDogs} = require('../handlers/h_getDogs')

const deleteDog = async (req, res) => {
    try {
        const {id} = req.params;

        await h_deleteDog(id)

        const dogs = await h_getDogs()
        
        res.status(200).json(dogs)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
 };
  
  module.exports = {
    deleteDog
  };