let mongoose = require('mongoose')


let listItem = new mongoose.Schema({
    listItem: {
        type: String,
        required: true,
        minlength: 1
    },
    lastChanged: {
        type: String,
        requried: true
    },
    nextChanged: {
        type: String,
        required: true 
    },
    itemDetails: String,
    userId: String

})

module.exports = mongoose.model('ListItem', listItem)