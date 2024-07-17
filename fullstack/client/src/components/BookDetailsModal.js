// src/components/BookDetailsModal.js

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, 
  Table, TableBody, TableCell, TableContainer, TableRow, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.action.hover,
  width: '30%',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: theme.palette.text.primary,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
}));

const BookDetailsModal = ({ book, onClose, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState({ ...book });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editedBook);
    setEditMode(false);
  };

  const bookDetails = [
    { label: 'Title', name: 'title' },
    { label: 'Author', name: 'author_name' },
    { label: 'Genre', name: 'genre_name' },
    { label: 'Price', name: 'price', type: 'number' },
    { label: 'Publication Date', name: 'publication_date', type: 'date' },
  ];

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        fontWeight: 900, 
        fontSize: '1.5rem' 
      }}>
        Book Details
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableBody>
              {bookDetails.map((detail) => (
                <TableRow key={detail.name}>
                  <StyledTableCell>{detail.label}</StyledTableCell>
                  <TableCell>
                    <StyledTextField
                      fullWidth
                      name={detail.name}
                      value={editedBook[detail.name]}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      type={detail.type || 'text'}
                      InputProps={{
                        readOnly: !editMode,
                      }}
                      variant="standard"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: 'background.default' }}>
        {editMode ? (
          <>
            <Button onClick={() => setEditMode(false)} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary" variant="contained">
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onClose} sx={{ bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }} variant="contained">
              Close
            </Button>
            <Button onClick={() => setEditMode(true)} color="primary" variant="contained">
              Edit
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookDetailsModal;