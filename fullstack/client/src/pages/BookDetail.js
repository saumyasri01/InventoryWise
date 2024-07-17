import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook } from '../services/api';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const getBook = async () => {
            const data = await fetchBook(id);
            setBook(data);
        };
        getBook();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
        </div>
    );
};

export default BookDetail;

