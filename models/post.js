const mongo = require('mongoose')

const PostShema = mongo.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongo.model('Post', PostShema)