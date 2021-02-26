const router = require('express').Router();
const { Ticket, Department, Status, User, Priority } = require('../models');

// get all tickets for homepage
router.get('/', (req, res) => {
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
        attributes: ['priority']
      },
      {
        model: Department,
        attributes: ['department_name']
      }],
  })
    .then(dbTicketData => {
      const tickets = dbTicketData.map(ticket => ticket.get({ plain: true }));

      res.render('homepage', { tickets, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) { res.redirect('/'); return; }

  res.render('login');
});

module.exports = router;
