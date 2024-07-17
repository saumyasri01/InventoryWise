import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const AddAuthorModal = ({ open, onClose, onAddAuthor }) => {
  const [newAuthor, setNewAuthor] = useState({ name: '', biography: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAuthor(newAuthor);
    setNewAuthor({ name: '', biography: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Author</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Author Name"
            type="text"
            fullWidth
            value={newAuthor.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="biography"
            label="Biography"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newAuthor.biography}
            onChange={handleInputChange}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAuthorModal;