const sequelize = require('../config/connection');
const { Department } = require('../models');

const departmentdata = [
    {
        department_name: 'Human Resources',
    },
    {
        department_name: 'Marketing',
    },
    {
        department_name: 'Customer Service',
    },
    {
        department_name: 'Sales',
    },
    {
        department_name: 'Accounting',
    },
    {
        department_name: 'Information Technology',
    },
    {
        department_name: 'Legal',
    }
];

const seedDepartments = () => Department.bulkCreate(departmentdata);

module.exports = seedDepartments;
