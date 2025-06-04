const express = require('express');
const {createAuthor, createBook, getBooksWithAuthor} = require('../controllers/Book-ctrl')

const router = express.Router();

router.post('/author', createAuthor);
router.post('/book', createBook);
router.get('/book/:id', getBooksWithAuthor);

module.exports = router;