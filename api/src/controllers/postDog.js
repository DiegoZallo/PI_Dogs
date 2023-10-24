const {Dog, Temperament} = require('../db');

const postDog = async (req, res) => {
    const {name, image, height, weight, life_span, temperament} = req.body;
    
    try {
        if(!name || !image || !height || !weight || !life_span || !Array.isArray(temperament)){
            return res.status(400).json({error:"Some data is missing"})
        }
        const [newDog, created] = await Dog.findOrCreate({
            where: { name, image, height, weight, life_span }
        });

        if (created) {
            await newDog.addTemperament(temperament);
            return res.status(200).json("Dog created successfully!");
        } else {
            return res.status(400).json({ error: "Dog already exists" });
        }     
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};



module.exports = {
    postDog
}