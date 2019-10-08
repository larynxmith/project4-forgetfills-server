let mongoose = require('mongoose')


let listItem = new mongoose.Schema({
    listItem: {
        type: String,
        required: true,
        minlength: 1
    },
    lastChanged: {
        type: Date,
        requried: true
    },
    nextChanged: {
        type: Date,
        required: true 
    },
    itemDetails: String

})

module.exports = mongoose.model('ListItem', listItem)