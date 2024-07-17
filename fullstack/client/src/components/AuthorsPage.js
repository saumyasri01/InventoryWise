import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaEdit, FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AuthorsPage.css';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [filter, setFilter] = useState('');
  const [newAuthor, setNewAuthor] = useState({ name: '', biography: '' });
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors', error);
      toast.error('Failed to fetch authors');
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingAuthor) {
      setEditingAuthor(prev => ({ ...prev, [name]: value }));
    } else {
      setNewAuthor(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (author) => {
    try {
      if (author.author_id) {
        await axios.put(`http://localhost:3000/api/authors/${author.author_id}`, author);
        toast.success('Author updated successfully' , {
          position: "top-center",
          style: { background: "#4CAF50",
            color: "black"
           }
         });
      } else {
        await axios.post('http://localhost:3000/api/authors', author);
        toast.success('Author added successfully', {
         position: "top-center",
         style: { background: "#4CAF50",
           color: "black"
          }
        });
        setNewAuthor({ name: '', biography: '' });
      }
      await fetchAuthors();
      setEditingAuthor(null);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving author', error);
      toast.error('Failed to save author');
    }
  };

  const handleDelete = async (authorId, authorName) => {
    toast.warn(
      <div>
        Are you sure you want to delete {authorName}?
        <button onClick={() => confirmDelete(authorId, authorName)}>Yes</button>
       
      </div>,
      { autoClose: true ,
        position: "top-center"
         }
    );
  };

  const confirmDelete = async (authorId, authorName) => {
    try {
      await axios.delete(`http://localhost:3000/api/authors/${authorId}`);
      toast.success(`Author "${authorName}" deleted successfully` , {
        position: "top-center" ,
        style: { background: "#4CAF50",
          color: "black"
         }
       });
      await fetchAuthors();
    } catch (error) {
      console.error('Error deleting author', error);
      toast.error(error.response?.data?.message || 'Failed to delete author');
    }
  };

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="authors-page">
      <ToastContainer />
     
      <div className="controls">
      <button className="add-button" onClick={() => setShowAddForm(true)}>
          <FaPlus /> Add New Author
        </button>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search authors..."
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        
      </div>
      
      {(showAddForm || editingAuthor) && (
        <div className="author-form">
          <h2>{editingAuthor ? 'Edit Author' : 'Add New Author'}</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(editingAuthor || newAuthor); }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editingAuthor ? editingAuthor.name : newAuthor.name}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="biography"
              placeholder="Biography"
              value={editingAuthor ? editingAuthor.biography : newAuthor.biography}
              onChange={handleInputChange}
              required
            />
            <div className="form-buttons">
              <button type="submit">{editingAuthor ? 'Update' : 'Add'} Author</button>
              <button type="button" onClick={() => { setEditingAuthor(null); setShowAddForm(false); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="authors-grid">
        {filteredAuthors.map((author) => (
          <div key={author.author_id} className="author-card">
            <h3>{author.name}</h3>
            <p>{author.biography.substring(0, 100)}...</p>
            <div className="author-actions">
              <button onClick={() => setEditingAuthor(author)}><FaEdit /> Edit</button>
              <button onClick={() => handleDelete(author.author_id, author.name)}><FaTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsPage;