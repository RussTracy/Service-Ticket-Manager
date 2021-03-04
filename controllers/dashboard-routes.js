const router = require('express').Router();
const { Ticket, Department, Status, User, Priority } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  Ticket.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'user_id',
      'department_id',
      'status_id',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Status,
        attributes: ['status_type']
      },
      {
        model: Priority,
        attributes: ['priority', 'id']
      },
      {
        model: Department,
        attributes: ['department_name', 'id']
      }],
    where: { user_id: req.session.user_id }
  })
    .then(dbTicketData => {
      const tickets = dbTicketData.map(ticket => ticket.get({ plain: true }));

      Priority.findAll({
        attributes: [
          'id',
          'priority'
        ]
      }).then(dbPriorityData => {
        const priorities = dbPriorityData.map(priority => priority.get({ plain: true }));

        Department.findAll({
          attributes: [
            'id',
            'department_name'
          ]
        }).then(dbDepartmentData => {
          const departments = dbDepartmentData.map(department => department.get({ plain: true }));

          res.render('dashboard', { tickets, priorities, departments, loggedIn: req.session.loggedIn, userName: req.session.username, dashboardCard: true });
        })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
    });
});

module.exports = router;
