const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const ticketRoutes = require('./ticket-routes');
const statusRoutes = require('./status-routes');
const priorityRoutes = require('./priority-routes');
const departmentRoutes = require('./department-routes');
const sendMail = require('./sendMail-routes')


router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);
router.use('/statuses', statusRoutes);
router.use('/priorities', priorityRoutes);
router.use('/departments', departmentRoutes);
router.use('/sendMail', sendMail)

module.exports = router;
