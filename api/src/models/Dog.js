const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4}, //algoritmo que genera UUIDs de manera aleatoria
    name: {
      type: DataTypes.STRING,
      allowNull: false,},
    image: {type: DataTypes.STRING,
            allowNull:false},
    height:{type: DataTypes.STRING,
            allowNull: false},
    weight:{type: DataTypes.STRING,
            allowNull: false},
    life_span:{type: DataTypes.STRING,
            allowNull: false}
    },{timestamps:false});
};
