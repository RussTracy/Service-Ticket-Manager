const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Status } = require('../../models');

router.get('/', (req, res) => {
    Status.findAll()
        .then(dbStatusData => res.json(dbStatusData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Status.findOne({
        where: {
            id: req.params.id
        },

    })
        .then(dbStatusData => {
            if (!dbStatusData) {
                res.status(404).json({ message: 'No status found with this id' });
                return;
            }
            res.json(dbStatusData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    req.session.loggedIn = true;
    if (req.session) {
        Status.create({
            status_type: req.body.status_type,
        })
            .then(dbStatusData => res.json(dbStatusData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Status.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbStatusData => {
            if (!dbStatusData) {
                res.status(404).json({ message: 'No status found with this id!' });
                return;
            }
            res.json(dbStatusData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;