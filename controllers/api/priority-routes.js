const router = require('express').Router();
const { Priority } = require('../../models');

router.get('/', (req, res) => {
    Priority.findAll()
        .then(dbPriorityData => res.json(dbPriorityData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Priority.findOne({
        where: {
            id: req.params.id
        },

    })
        .then(dbPriorityData => {
            if (!dbPriorityData) {
                res.status(404).json({ message: 'No priority found with this id' });
                return;
            }
            res.json(dbPriorityData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;