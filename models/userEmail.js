const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Useremail extends Model {
    // set up method to run on instance data (per user) to check password
}
Useremail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Useremail'
    });
module.exports = Useremail;