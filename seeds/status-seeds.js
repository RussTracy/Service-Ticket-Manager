const sequelize = require('../config/connection');
const { Status } = require('../models');

const statusdata = [
    {
        status_type: 'New',
    },
    {
        status_type: 'Pending',
    },
    {
        status_type: 'Processing',
    },
    {
        status_type: 'Solved',
    }
];

const seedStatuses = () => Status.bulkCreate(statusdata);

module.exports = seedStatuses;
