const {Dog} = require('../db');

const h_deleteDog = async(id)=>{

    const deleteDog = await Dog.findByPk(id);
    if(!deleteDog) throw new Error('Dog not found')

    const deleted = await deleteDog.destroy({ force: true });
    if(deleted === 0) throw new Error(`There was an issue trying to delete the Dod with id:${id} `);

};

module.exports = {
    h_deleteDog
  };