-- Create the database
CREATE DATABASE bookmart;

-- Use the database
USE bookmart;

-- Create Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff') DEFAULT 'staff'
);

-- Create Authors table
CREATE TABLE Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    biography TEXT
);

-- Create Genres table
CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(100) NOT NULL
);

-- Create Books table
CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    genre_id INT,
    price DECIMAL(10, 2) NOT NULL,
    publication_date DATE,
    stock INT DEFAULT 0,
    cover_image VARCHAR(255),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

-- Create Reviews table
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert sample data
-- Insert Genres
INSERT INTO Genres (genre_name) VALUES
('Fiction'),
('Non-fiction'),
('Mystery'),
('Science Fiction'),
('Fantasy'),
('Romance'),
('Thriller'),
('Horror'),
('Biography'),
('Historical Fiction');

-- Insert Authors
INSERT INTO Authors (name, biography) VALUES
('J.K. Rowling', 'British author best known for the Harry Potter series'),
('George Orwell', 'English novelist and essayist'),
('Harper Lee', 'American novelist widely known for To Kill a Mockingbird'),
('F. Scott Fitzgerald', 'American fiction writer'),
('Jane Austen', 'English novelist known for her romance fiction'),
('Stephen King', 'American author of horror, supernatural fiction, and fantasy'),
('Agatha Christie', 'British crime novelist'),
('Ernest Hemingway', 'American novelist and short story writer'),
('Charles Dickens', 'English writer and social critic'),
('Mark Twain', 'American writer, humorist, and lecturer'),
('Virginia Woolf', 'English writer and modernist'),
('John Steinbeck', 'American author and Nobel Prize winner'),
('Leo Tolstoy', 'Russian writer regarded as one of the greatest authors of all time'),
('William Shakespeare', 'English playwright and poet'),
('Gabriel García Márquez', 'Colombian novelist and Nobel Prize winner'),
('Oscar Wilde', 'Irish poet and playwright'),
('Emily Brontë', 'English novelist and poet'),
('George R.R. Martin', 'American novelist and short story writer'),
('Dan Brown', 'American author known for thriller novels'),
('Margaret Atwood', 'Canadian poet and novelist');

-- Insert Books
INSERT INTO Books (title, author_id, genre_id, price, publication_date, stock, cover_image) VALUES
('Harry Potter and the Philosopher''s Stone', 1, 5, 19.99, '1997-06-26', 100, 'harry_potter1.jpg'),
('1984', 2, 4, 15.99, '1949-06-08', 50, '1984.jpg'),
('To Kill a Mockingbird', 3, 1, 14.99, '1960-07-11', 80, 'to_kill_a_mockingbird.jpg'),
('The Great Gatsby', 4, 1, 12.99, '1925-04-10', 70, 'the_great_gatsby.jpg'),
('Pride and Prejudice', 5, 6, 9.99, '1813-01-28', 60, 'pride_and_prejudice.jpg');

-- Insert Reviews
INSERT INTO Reviews (book_id, user_id, rating, comment) VALUES
(1, 1, 5, 'An amazing start to a magical series!'),
(2, 2, 4, 'A chilling dystopian novel.'),
(3, 3, 5, 'A powerful and moving story.'),
(4, 4, 4, 'A classic tale of the American dream.'),
(5, 5, 5, 'A timeless romance.');
