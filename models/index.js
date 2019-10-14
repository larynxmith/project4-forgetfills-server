let mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/forgetfills', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})



module.exports.User = require('./User')
module.exports.ListItem = require('./ListItem')