const router = require('express').Router();
const { Ticket, Department, Status, User, Priority } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for departments
router.get('/', withAuth, (req, res) => {
  Department.findAll({
    attributes: [
      'id',
      'department_name',
    ]
  })
    .then(dbDepartmentData => {
      const departments = dbDepartmentData.map(department => department.get({ plain: true }));
      res.render('departments', { departments, loggedIn: req.session.loggedIn, userName: req.session.username, dashboardCard: false });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
