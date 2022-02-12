const mongoose = require('mongoose');

const MessageModel = mongoose.model(
    "KasuaAppDB", {
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
    },

    "messages"
);

module.exports = { MessageModel };