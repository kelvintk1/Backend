const Author = require('../models/Author');
const Book = require('../models/Book');

const createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const newAuthor = new Author({ name, bio });
        await newAuthor.save();
        res.status(201).json({
            success: true,
            data: newAuthor
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occurred!"
        });
    }
};

const createBook = async (req, res) => {
    try {
        const { title, authorId } = req.body;
        const newBook = new Book({ title, author: authorId });
        await newBook.save();
        res.status(201).json({
            success: true,
            data: newBook
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occurred!"
        });
    }
}

const getBooksWithAuthor = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if(!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found!"
            });
        }
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occurred!"
        });
    }
};

module.exports = {
    createAuthor,
    createBook,
    getBooksWithAuthor
};