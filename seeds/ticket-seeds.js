const sequelize = require('../config/connection');
const { Ticket } = require('../models');

const ticketdata = [
    {
        title: 'New Ticket 1',
        description: 'This is the description for new ticket 1',
        user_id: 1,
        department_id: 1,
        status_id: 1,
        priority_id: 1
    },
    {
        title: 'New Ticket 2',
        description: 'This is the description for new ticket 2',
        user_id: 2,
        department_id: 2,
        status_id: 2,
        priority_id: 2
    },
    {
        title: 'New Ticket 3',
        description: 'This is the description for new ticket 3',
        user_id: 3,
        department_id: 3,
        status_id: 3,
        priority_id: 3
    },
    {
        title: 'New Ticket 4',
        description: 'This is the description for new ticket 4',
        user_id: 4,
        department_id: 4,
        status_id: 4,
        priority_id: 4
    },
    {
        title: 'New Ticket 5',
        description: 'This is the description for new ticket 5',
        user_id: 1,
        department_id: 3,
        status_id: 2,
        priority_id: 1
    }
];

const seedTickets = () => Ticket.bulkCreate(ticketdata);

module.exports = seedTickets;
