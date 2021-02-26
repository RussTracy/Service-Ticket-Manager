const seedUsers = require('./user-seeds');
const seedDepartments = require('./department-seeds');
const seedStatuses = require('./status-seeds');
const seedTickets = require('./ticket-seeds');
const seedPriorities = require('./priority-seeds');
const sequelize = require('../config/connection');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');

    await seedUsers();
    console.log('--------------');

    await seedDepartments();
    console.log('--------------');

    await seedStatuses();
    console.log('--------------');

    await seedPriorities();
    console.log('--------------');

    await seedTickets();
    console.log('--------------');

    process.exit(0);
};

seedAll();
