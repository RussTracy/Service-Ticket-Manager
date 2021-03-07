const router = require('express').Router();
const { Ticket, Department, Status, User, Priority } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', (req, res) => {
  Department.findAll({
    attributes: [
      'id',
      'department_name',
    ]
  })
    .then(dbDepartmentData => {
      const departments = dbDepartmentData.map(department => department.get({ plain: true }));
      res.render('departments', { departments });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
