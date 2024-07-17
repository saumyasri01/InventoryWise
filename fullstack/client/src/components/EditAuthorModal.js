import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditAuthorModal = ({ open, onClose, onUpdateAuthor, author }) => {
  const [editedAuthor, setEditedAuthor] = useState({ name: '', biography: '' });

  useEffect(() => {
    if (author) {
      setEditedAuthor({ name: author.name, biography: author.biography });
    }
  }, [author]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAuthor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAuthor({ ...author, ...editedAuthor });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Author</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Author Name"
            type="text"
            fullWidth
            value={editedAuthor.name}
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
            value={editedAuthor.biography}
            onChange={handleInputChange}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAuthorModal;