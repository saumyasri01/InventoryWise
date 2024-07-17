import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteAuthorsComponent = ({ authors, onAuthorDeleted }) => {
  const handleDelete = async (authorId, authorName) => {
    console.log('Attempting to delete author:', { authorId, authorName });

    if (!authorId) {
      console.error('Invalid author ID:', authorId);
      toast.error(`Cannot delete author "${authorName}". Invalid author ID.`);
      return;
    }

    try {
      console.log('Sending delete request for author ID:', authorId);
      const response = await axios.delete(`http://localhost:3000/api/authors/${authorId}`);
      console.log('Delete response:', response);

      toast.success(`Author "${authorName}" deleted successfully.`);
      onAuthorDeleted();
    } catch (error) {
      console.error('Error deleting author', error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(`Failed to delete author "${authorName}". Please try again later.`);
      }
    }
  };

  return (
    <div className="delete-authors-component">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h2>Delete Authors</h2>
      <ul>
        {authors.map(author => (
          <li key={author.author_id || author.authorId}>
            {author.name} (ID: {author.author_id || author.authorId})
            <button onClick={() => handleDelete(author.author_id || author.authorId, author.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteAuthorsComponent;