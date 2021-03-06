const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Ticket, Department, Status, User, Priority } = require('../../models');
require("dotenv").config()

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
}))



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
                attributes: ['department_name', 'id']
            },
            {
                model: Status,
                attributes: ['status_type', 'id']
            },
            {
                model: Priority,
                attributes: ['priority', 'id']
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
            user_id: req.session.user_id, // Get user id from session variables
            department_id: req.body.department_id,
            status_id: req.body.status_id,
            priority_id: req.body.priority_id
        })
            .then(dbTicketData => {
                transporter.sendMail({
                    to: "6bodaley6@gmail.com",
                    from: process.env.MYEMAIL,
                    subject: 'Service-Ticket-Manager-Email',
                    html: `
<p>You have created a ticket!</p>
    `
                })
                res.json(dbTicketData)

            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.put('/:id', withAuth, (req, res) => {
    Ticket.update({
        title: req.body.title,
        description: req.body.description,
        department_id: req.body.department_id,
        priority_id: req.body.priority_id,
        status_id: req.body.status_id
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(dbTicketData => res.json(dbTicketData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
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