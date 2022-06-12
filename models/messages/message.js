const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MessageModelSchema = new Schema({
    auteur: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const MessageModel = mongoose.model(
    "messages",
    MessageModelSchema,
    "messages",
);

module.exports = { MessageModel };