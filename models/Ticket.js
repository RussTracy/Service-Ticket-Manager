const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Ticket model
class Ticket extends Model { }

// Create fields/columns for Ticket model
Ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'department',
                key: 'id'
            }
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'status',
                key: 'id'
            }
        },
        priority_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'priority',
                key: 'id'
            }
        },
        //!!added email_id model below
        email_id: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'ticket'
    }
);

module.exports = Ticket;