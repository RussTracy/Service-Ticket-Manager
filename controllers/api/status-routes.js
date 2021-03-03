const router = require('express').Router();
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

module.exports = router;