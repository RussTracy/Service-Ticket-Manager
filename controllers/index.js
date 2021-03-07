const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const departmentRoutes = require('./department-routes.js');
const apiRoutes = require('./api/');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/departments', departmentRoutes);
router.use('/api', apiRoutes);

module.exports = router;
