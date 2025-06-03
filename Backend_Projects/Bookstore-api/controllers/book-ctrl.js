const Book = require('../models/book')

const getAllBooks = async(req, res) => {
    try {
        const books = await Book.find({});
        if(books?.length > 0) {
        res.status(200).json({
            success: true,
            count: books.length,
            message: 'Books fetched successfully',
            data: books
        });
        } else {
        res.status(404).json({
            success: false,
            message: 'No books found'
        });
    }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch books',
            error: e.message
        });
    }
};

const getSingleBookById = async(req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (book) {
            res.status(200).json({
                success: true,
                message: 'Book fetched successfully',
                data: book
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Book with this ID not found, please check the ID',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch book',
            error: e.message
        });
    }
}

const addNewBook = async(req, res) => {
    try {
        const newBookFromData = req.body;
        
        // Log the incoming data for debugging
        console.log("Received book data:", newBookFromData);
        
        const newlyCreatedBook = await Book.create(newBookFromData);
        
        if (newlyCreatedBook) {
            res.status(201).json({
                success: true,
                message: 'Book added successfully',
                data: newlyCreatedBook,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Failed to add book',
                error: 'Book creation returned null/undefined'
            });
        }
    } catch (e) {
        console.log("Error details:", e);
        
        // Provide more specific validation error messages
        if (e.name === 'ValidationError') {
            const validationErrors = {};
            
            // Extract and format validation errors
            for (const field in e.errors) {
                validationErrors[field] = e.errors[field].message;
            }
            
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to add book',
            error: e.message
        });
    }
}

const updateBook = async (req, res) => {
    try {
        const updatedBookFormData = req.body;
        const bookId = req.params.id;

        // Find book by ID and update with the new data
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            updatedBookFormData,
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found with this ID",
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Book updated successfully",
                data: updatedBook
            });
        }
    } catch (e) {
        console.log(e);
        // Enhanced validation error reporting
        if (e.name === 'ValidationError') {
            const validationErrors = {};
            for (const field in e.errors) {
                validationErrors[field] = e.errors[field].message;
            }
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again.",
            error: e.message
        });
    }
};

const deleteBook = async(req, res)=> {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (deletedBook) {
            res.status(200).json({
                success: true,
                message: 'Book deleted successfully',
                data: deletedBook
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Book with this ID not found, please check the ID',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error: e.message
        });
    }
}

module.exports = {getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook}