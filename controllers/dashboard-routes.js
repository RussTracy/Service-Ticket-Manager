const router = require('express').Router();
const { Ticket, Department, Status, User, Priority } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  // res.render('dashboard', { tickets, loggedIn: true });
  res.render('dashboard', { loggedIn: true });
});

module.exports = router;
