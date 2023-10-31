const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
        }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        },
    image: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: 
                {isUrl: true}
        },
    height:{
        type: DataTypes.STRING,
        allowNull: false
        },
    weight:{
        type: DataTypes.STRING,
        allowNull: false
        },
    life_span:{
        type: DataTypes.STRING,
        allowNull: false
        }
    },{timestamps:false});
};
