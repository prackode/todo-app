const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    todo: {
        type: String,
        minlength: [3, 'ToDo description must be at least 3 characters long'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoListSchema);
