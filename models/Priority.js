const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Priority extends Model { }

Priority.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        priority: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [3]
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'priority'
    }
);

module.exports = Priority;