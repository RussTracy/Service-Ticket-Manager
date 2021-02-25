const User = require('./User');
const Ticket = require('./Ticket');
const Department = require('./Department');
const Status = require('./Status');

// Create associations
User.hasMany(Ticket, {
    foreignKey: 'user_id'
});

Ticket.belongsTo(User, {
    foreignKey: 'user_id'
});

Ticket.belongsTo(Department, {
    foreignKey: 'department_id'
});

Ticket.belongsTo(Status, {
    foreignKey: 'status_id'
});

module.exports = { User, Status, Department, Ticket };
