const sequelize = require('../config/connection');
const { Status } = require('../models');

const statusdata = [
    {
        status_type: 'Open',
    },
    {
        status_type: 'Closed',
    },
    {
        status_type: 'Assigned',
    },
    {
        status_type: 'Processing',
    }
];

const seedStatuses = () => Status.bulkCreate(statusdata);

module.exports = seedStatuses;
