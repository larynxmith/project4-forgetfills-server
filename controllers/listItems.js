// create router and reference to models
let router = require('express').Router()
let db = require('../models')

//GET all items
router.get('/', (req, res) => {
    db.ListItem.find({
        userId: req.user._id
    })
        .then(items => {
            res.status(201).send(items)
        })
})

//POST to /listItems
router.post('/', (req, res) => {
    db.ListItem.create(req.body)
        .then(item => {
            res.status(201).send(item)
        })
});

//PUT to /listItems/:id
router.put('/:id', (req, res) => {
    db.ListItem.findOneAndUpdate({
        _id: req.params.id
    },
        req.body,
        {
            new: true
        })
        .then(editedItem => {
            res.send(editedItem)
        })
        .catch(err => {
            console.log(err)
            res.status(503).send({ message: 'Server Error' })
        })
});

// DELETE /listItems/:id
router.delete("/:id", (req, res) => {
    db.ListItem.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            console.log(err);
            res.status(503).send({ message: "Server Error" });
        });
});

module.exports = router;