const sequelize = require('../config/connection');
const { Priority } = require('../models');

const prioritydata = [
    {
        priority: 'Urgent',
    },
    {
        priority: 'High',
    },
    {
        priority: 'Medium',
    },
    {
        priority: 'Low',
    }
];

const seedPriorities = () => Priority.bulkCreate(prioritydata);

module.exports = seedPriorities;
