const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model { }

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        department_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [2]
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'department'
    }
);

module.exports = Department;