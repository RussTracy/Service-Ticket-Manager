const User = require('./User');
const Department = require('./Department');
const Status = require('./Status');
const Priority = require('./Priority');
const Ticket = require('./Ticket');

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

Ticket.belongsTo(Priority, {
    foreignKey: 'priority_id'
});

module.exports = { User, Status, Department, Priority, Ticket };
