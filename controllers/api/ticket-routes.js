const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Ticket, Department, Status, User, Priority } = require('../../models');

router.get('/', (req, res) => {
    Ticket.findAll({
        attributes: ['title', 'description']
    })
        .then(dbTicketData => res.json(dbTicketData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Ticket.findOne({
        attributes: ['title', 'description'],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Department,
                attributes: ['department_name']
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
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbTicketData => {
            if (!dbTicketData) {
                res.status(404).json({ message: 'No Ticket found with this id' });
                return;
            }
            res.json(dbTicketData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Ticket.create({
            title: req.body.title,
            description: req.body.description,
            //user_id: req.body.user_id,
            user_id: req.session.user_id, // Get user id from session variables
            department_id: req.body.department_id,
            status_id: req.body.status_id,
            priority_id: req.body.priority_id
        })
            .then(dbTicketData => res.json(dbTicketData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Ticket.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbTicketData => {
            if (!dbTicketData) {
                res.status(404).json({ message: 'No Ticket found with this id!' });
                return;
            }
            res.json(dbTicketData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;