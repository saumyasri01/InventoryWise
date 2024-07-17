// src/components/AddBookModal.js
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';

const AddBookModal = ({ authors, genres, onAddBook, onClose }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author_name: '',
    genre_name: '',
    price: '',
    publication_date: ''
  });
  const [titleError, setTitleError] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: value }));
    if (name === 'title') {
      setTitleError(value.trim() === '');
    }
  };
  
  const handleSubmit = () => {
    if (newBook.title.trim() === '') {
      setTitleError(true);
      return;
    }
    if (!newBook.author_name || !newBook.genre_name) {
      alert('Please select both an author and a genre.');
      return;
    }
    onAddBook(newBook);
  };
  
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          error={titleError}
          helperText={titleError ? "Title cannot be empty" : ""}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Author</InputLabel>
          <Select
            name="author_name"
            value={newBook.author_name}
            onChange={handleInputChange}
            label="Author"
          >
            {authors.map(author => (
              <MenuItem key={author.id} value={author.name}>{author.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Genre</InputLabel>
          <Select
            name="genre_name"
            value={newBook.genre_name}
            onChange={handleInputChange}
            label="Genre"
          >
            {genres.map(genre => (
              <MenuItem key={genre.genre_id} value={genre.genre_name}>{genre.genre_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          type="number"
          value={newBook.price}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Publication Date"
          name="publication_date"
          type="date"
          value={newBook.publication_date}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{backgroundColor: 'grey', color: 'white','&:hover': { backgroundColor: 'darkgrey' } }}>Cancel</Button>
        <Button onClick={handleSubmit} sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkgreen' } }}>Add Book</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookModal;