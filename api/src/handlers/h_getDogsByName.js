
const h_getDogsByName = async(name, dogs)=>{

    if(Array.isArray(dogs)){
        dogs = dogs.filter((dog)=>{
            return dog.name.toLowerCase().includes(name.toLowerCase())
        });
        return dogs
    }else{
        throw Error('There is no dog matching the Name search criteria')
    }
};

module.exports = {
    h_getDogsByName
  };