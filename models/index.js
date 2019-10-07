let mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern-sei-26', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})



module.exports.User = require('./user')