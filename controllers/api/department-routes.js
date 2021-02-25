const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Department } = require('../../models');

router.get('/', (req, res) => {
    Department.findAll()
        .then(dbDepartmentData => res.json(dbDepartmentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Department.findOne({
        where: {
            id: req.params.id
        },

    })
        .then(dbDepartmentData => {
            if (!dbDepartmentData) {
                res.status(404).json({ message: 'No department found with this id' });
                return;
            }
            res.json(dbDepartmentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Department.create({
            department_name: req.body.department_name,
        })
            .then(dbDepartmentData => res.json(dbDepartmentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Department.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbDepartmentData => {
            if (!dbDepartmentData) {
                res.status(404).json({ message: 'No department found with this id!' });
                return;
            }
            res.json(dbDepartmentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;