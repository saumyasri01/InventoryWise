const { getAllBooks, getBookById, insertBook, updateBookById, deleteBookById } = require('../models/bookModel');

const formatBook = (book) => ({
    id: book.book_id,
    title: book.title,
    price: book.price,
    publication_date: book.publication_date instanceof Date 
        ? book.publication_date.toISOString().split('T')[0] 
        : book.publication_date,
    author_name: book.author_name,
    genre_name: book.genre_name
});

const getBooks = (req, res) => {
    getAllBooks((err, results) => {
        if (err) {
            console.error('Error fetching books:', err);
            return res.status(500).json({ message: 'Error fetching books' });
        }
        console.log('Raw books data:', results);
        console.log('Raw publication_date type:', typeof results[0].publication_date);
        console.log('Raw publication_date value:', results[0].publication_date);
        const formattedBooks = results.map(formatBook);
        console.log('Formatted books data:', formattedBooks);
        res.json(formattedBooks);
    });
};

const getBook = (req, res) => {
    const bookId = req.params.id;
    
    getBookById(bookId, (err, results) => {
        if (err) {
            console.error('Error fetching book:', err);
            return res.status(500).json({ message: 'Error fetching book' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        console.log('Raw book data:', results[0]);
        console.log('Raw publication_date type:', typeof results[0].publication_date);
        console.log('Raw publication_date value:', results[0].publication_date);
        const formattedBook = formatBook(results[0]);
        console.log('Formatted book data:', formattedBook);
        res.json(formattedBook);
    });
};

const createBook = (req, res) => {
    const { title, price, publication_date, author_name, genre_name } = req.body;
    console.log('Received book data:', { title, price, publication_date, author_name, genre_name });
    
    insertBook(title, price, publication_date, author_name, genre_name, (err, result) => {
        if (err) {
            console.error('Error creating book:', err);
            return res.status(500).json({ message: 'Error creating book' });
        }
        console.log('Book creation result:', result);
        res.status(201).json({ message: 'Book created successfully', bookId: result.insertId });
    });
};

const updateBook = (req, res) => {
    const bookId = req.params.id;
    const { title, price, publication_date, author_name, genre_name } = req.body;
    console.log('Updating book:', { bookId, title, price, publication_date, author_name, genre_name });
    
    updateBookById(bookId, title, price, publication_date, author_name, genre_name, (err, result) => {
        if (err) {
            console.error('Error updating book:', err);
            return res.status(500).json({ message: 'Error updating book' });
        }
        console.log('Book update result:', result);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully' });
    });
};

const deleteBook = (req, res) => {
    const bookId = req.params.id;
    console.log('Deleting book with ID:', bookId);
    
    deleteBookById(bookId, (err, result) => {
        if (err) {
            console.error('Error deleting book:', err);
            return res.status(500).json({ message: 'Error deleting book' });
        }
        console.log('Book deletion result:', result);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    });
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };