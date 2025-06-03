const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book title is required"],
        trim: true,
        maxLength: [100, "Book title cannot exceed 100 characters"],
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, "Publication year is required"],
        min: [1900, "Publication year cannot be before 1900"],
        max: [new Date().getFullYear(), "Publication year cannot be in the future"],
    },
    genre: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;