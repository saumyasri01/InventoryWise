// src/components/BooksPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, TextField, Select, MenuItem, Button, Grid, Card, CardContent, CardActions,
  IconButton, AppBar, Drawer, Box, CircularProgress, Chip, Pagination, useMediaQuery,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Add as AddIcon, Delete as DeleteIcon, FilterList as FilterListIcon, Info as InfoIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import BookDetailsModal from './BookDetailsModal';
import AddBookModal from './AddBookModal';
import './BooksPage.css';
import filterBgImage from './bg2.png';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [booksPerPage] = useState(6);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/api/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleFilter = useCallback(() => {
    let filtered = books;
    
    if (searchTerm) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedAuthor) {
      filtered = filtered.filter(book => book.author_name === selectedAuthor);
    }
    
    if (selectedGenre) {
      filtered = filtered.filter(book => book.genre_name === selectedGenre);
    }

    filtered.sort((a, b) => {
      if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return 0;
      const titleA = a.title || '';
      const titleB = b.title || '';
      if (sortOrder === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    setFilteredBooks(filtered);
    setPage(1);
  }, [books, searchTerm, selectedAuthor, selectedGenre, sortOrder]);

  useEffect(() => {
    console.log('Books updated:', books);
    handleFilter();
  }, [books, handleFilter]);

  const handleShowDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const handleAddBook = async (newBook) => {
    try {
      console.log('Adding new book:', newBook);
      if (!newBook.title.trim() || !newBook.author_name || !newBook.genre_name) {
        throw new Error('Book title, author, and genre are required');
      }
      const response = await axios.post('http://localhost:3000/api/books', newBook);
      console.log('Server response:', response.data);
      
      // Fetch books again to refresh the list
      await fetchBooks();
      
      handleFilter();
      setShowAddBookModal(false);
      setSnackbar({ open: true, message: 'Book added successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error adding book:', error);
      setSnackbar({ open: true, message: error.message || 'Failed to add book. Please try again.', severity: 'error' });
    }
  };
  const handleUpdateBook = async (updatedBook) => {
    try {
      await axios.put(`http://localhost:3000/api/books/${updatedBook.id}`, updatedBook);
      setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
      setFilteredBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
      setSelectedBook(updatedBook);
      handleFilter();
      setShowDetailsModal(false);
      setSnackbar({ open: true, message: 'Book updated successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error updating book:', error);
      setSnackbar({ open: true, message: 'Failed to update book. Please try again.', severity: 'error' });
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${bookId}`);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      setFilteredBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      handleFilter();
      setSnackbar({ open: true, message: 'Book deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error deleting book:', error);
      setSnackbar({ open: true, message: 'Failed to delete book. Please try again.', severity: 'error' });
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAuthor('');
    setSelectedGenre('');
    setSortOrder('asc');
    handleFilter();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography color="error">{error}</Typography>
    </Box>
  );

  // Pagination
  const indexOfLastBook = page * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const filterContent = (
    <Box className="filter-content"  sx={{
      backgroundImage: `url(${filterBgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      padding: 2,
      borderRadius: 2,
      color: '#fff',
    }}>
      <Typography variant="h6" className="filter-title" sx={{ color:'#000000',fontWeight: 'bold', mb: 2 }}>Filters and Sorting</Typography>
      <TextField
        fullWidth
        label="Search books"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="filter-item"
        sx={{ mb: 2 }}
      />
      <Select
        fullWidth
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
        displayEmpty
        className="filter-item"
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Authors</MenuItem>
        {authors.map(author => (
          <MenuItem key={author.id} value={author.name}>{author.name}</MenuItem>
        ))}
      </Select>
      <Select
        fullWidth
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        displayEmpty
        className="filter-item"
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Genres</MenuItem>
        {genres.map(genre => (
          <MenuItem key={genre.genre_id} value={genre.genre_name}>{genre.genre_name}</MenuItem>
        ))}
      </Select>
      <Button fullWidth onClick={toggleSortOrder} variant="contained" color="info" className="filter-item" sx={{ mb: 2 }}>
        Sort {sortOrder === 'asc' ? '↑' : '↓'}
      </Button>
      <Button fullWidth onClick={handleFilter} variant="contained" color="primary" className="filter-item" sx={{ mb: 2 }}>
        Apply Filters
      </Button>
      <Button 
  fullWidth 
  onClick={clearFilters} 
  variant="contained" 
  color="inherit" 
  sx={{ backgroundColor: 'grey.500', '&:hover': { backgroundColor: 'grey.600' } }}
  className="filter-item"
>
  Clear Filters
</Button>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        {isMobile && (
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <FilterListIcon />
          </IconButton>
        )}
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              {filterContent}
            </Grid>
          )}
          <Grid item xs={12} md={isMobile ? 12 : 9}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAddBookModal(true)}
              sx={{ my: 2, fontSize: '1.1rem', textTransform:'none', fontWeight: 'bold',padding: '10px 20px', backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
            >
              Add New Books
            </Button>

            <Grid container spacing={3}>
              {currentBooks.map(book => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <Card className="book-card" sx={{ border: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component={Link} to={`/books/${book.id}`} className="book-title" sx={{ fontWeight: 'bold' }}>
                        {book.title}
                      </Typography>
                      <Typography color="textSecondary" sx={{ fontWeight: 'bold' }}>{book.author_name}</Typography>
                      <Chip label={book.genre_name} size="small" sx={{ mt: 1, fontWeight: 'bold' }} />
                    </CardContent>
                    <CardActions>
                      <Button size="small" startIcon={<InfoIcon />} onClick={() => handleShowDetails(book)}>Details</Button>
                      <IconButton size="small" onClick={() => handleDeleteBook(book.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
  <Pagination 
    count={Math.ceil(filteredBooks.length / booksPerPage)} 
    page={page} 
    onChange={handlePageChange}
    sx={{
      '& .MuiPaginationItem-root': {
        color: 'white',
        '&.Mui-selected': {
          backgroundColor: 'rgba(255, 255, 0, 0.3)',
        },
      },
    }}
  />
</Box>
          </Grid>
        </Grid>
      </Container>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          {filterContent}
        </Box>
      </Drawer>

      {showDetailsModal && (
        <BookDetailsModal
          book={selectedBook}
          onClose={() => setShowDetailsModal(false)}
          onUpdate={handleUpdateBook}
        />
      )}

      {showAddBookModal && (
        <AddBookModal
          authors={authors}
          genres={genres}
          onAddBook={handleAddBook}
          onClose={() => setShowAddBookModal(false)}
        />
      )}



      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BooksPage;