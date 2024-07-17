-- Create the database
CREATE DATABASE bookmart;

-- Use the database
USE bookmart;

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
    FOREIGN KEY (author_id) REFERENCES Authors(author_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

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

commit;

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

commit;

-- Insert Books
INSERT INTO Books (title, author_id, genre_id, price, publication_date) VALUES
('Harry Potter and the Philosopher''s Stone', 1, 5, 19.99, '1997-06-26'),
('1984', 2, 4, 15.99, '1949-06-08'),
('To Kill a Mockingbird', 3, 1, 14.99, '1960-07-11'),
('The Great Gatsby', 4, 1, 12.99, '1925-04-10'),
('Pride and Prejudice', 5, 6, 9.99, '1813-01-28'),
('The Shining', 6, 8, 16.99, '1977-01-28'),
('Murder on the Orient Express', 7, 3, 13.99, '1934-01-01'),
('The Old Man and the Sea', 8, 1, 11.99, '1952-09-01'),
('A Tale of Two Cities', 9, 10, 10.99, '1859-04-30'),
('The Adventures of Huckleberry Finn', 10, 1, 12.99, '1884-12-10'),
('Mrs. Dalloway', 11, 1, 14.99, '1925-05-14'),
('Of Mice and Men', 12, 1, 11.99, '1937-02-25'),
('War and Peace', 13, 10, 24.99, '1869-01-01'),
('Hamlet', 14, 1, 9.99, '1603-01-01'),
('One Hundred Years of Solitude', 15, 1, 17.99, '1967-05-30'),
('The Picture of Dorian Gray', 16, 1, 12.99, '1890-07-01'),
('Wuthering Heights', 17, 6, 10.99, '1847-12-01'),
('A Game of Thrones', 18, 5, 18.99, '1996-08-01'),
('The Da Vinci Code', 19, 7, 15.99, '2003-03-18'),
('The Handmaid''s Tale', 20, 4, 16.99, '1985-06-01'),
('Harry Potter and the Chamber of Secrets', 1, 5, 19.99, '1998-07-02'),
('Animal Farm', 2, 1, 13.99, '1945-08-17'),
('Go Set a Watchman', 3, 1, 16.99, '2015-07-14'),
('Tender Is the Night', 4, 1, 14.99, '1934-04-12'),
('Sense and Sensibility', 5, 6, 10.99, '1811-01-01'),
('It', 6, 8, 18.99, '1986-09-15'),
('And Then There Were None', 7, 3, 12.99, '1939-11-06'),
('For Whom the Bell Tolls', 8, 1, 15.99, '1940-10-21'),
('Oliver Twist', 9, 1, 11.99, '1837-02-01'),
('The Adventures of Tom Sawyer', 10, 1, 12.99, '1876-01-01'),
('Orlando', 11, 1, 13.99, '1928-10-11'),
('The Grapes of Wrath', 12, 1, 16.99, '1939-04-14'),
('Anna Karenina', 13, 1, 19.99, '1877-01-01'),
('Romeo and Juliet', 14, 6, 9.99, '1597-01-01'),
('Love in the Time of Cholera', 15, 6, 16.99, '1985-03-01'),
('The Importance of Being Earnest', 16, 1, 10.99, '1895-02-14'),
('Jane Eyre', 17, 6, 11.99, '1847-10-16'),
('A Clash of Kings', 18, 5, 18.99, '1998-11-16'),
('Angels & Demons', 19, 7, 15.99, '2000-05-01'),
('The Blind Assassin', 20, 1, 17.99, '2000-09-02'),
('Harry Potter and the Prisoner of Azkaban', 1, 5, 19.99, '1999-07-08'),
('Brave New World', 2, 4, 14.99, '1932-01-01'),
('Sense and Sensibility', 5, 6, 10.99, '1811-01-01'),
('The Stand', 6, 8, 19.99, '1978-10-03'),
('Death on the Nile', 7, 3, 13.99, '1937-11-01'),
('A Farewell to Arms', 8, 1, 14.99, '1929-09-27'),
('Great Expectations', 9, 1, 12.99, '1861-08-01'),
('The Prince and the Pauper', 10, 1, 11.99, '1881-12-01'),
('To the Lighthouse', 11, 1, 13.99, '1927-05-05'),
('East of Eden', 12, 1, 17.99, '1952-09-19'),
('The Death of Ivan Ilyich', 13, 1, 11.99, '1886-01-01'),
('Macbeth', 14, 1, 9.99, '1606-01-01'),
('Chronicle of a Death Foretold', 15, 1, 13.99, '1981-01-01'),
('The Canterville Ghost', 16, 8, 10.99, '1887-02-23'),
('The Tenant of Wildfell Hall', 17, 1, 12.99, '1848-06-01'),
('A Storm of Swords', 18, 5, 18.99, '2000-08-08'),
('Inferno', 19, 7, 16.99, '2013-05-14'),
('Cat''s Eye', 20, 1, 15.99, '1988-01-01'),
('Harry Potter and the Goblet of Fire', 1, 5, 21.99, '2000-07-08'),
('Down and Out in Paris and London', 2, 2, 13.99, '1933-01-09'),
('Emma', 5, 6, 11.99, '1815-12-23'),
('Misery', 6, 8, 15.99, '1987-06-08'),
('The Murder of Roger Ackroyd', 7, 3, 12.99, '1926-06-01'),
('The Sun Also Rises', 8, 1, 13.99, '1926-10-22'),
('David Copperfield', 9, 1, 14.99, '1850-05-01'),
('A Connecticut Yankee in King Arthur''s Court', 10, 5, 12.99, '1889-12-01'),
('The Waves', 11, 1, 14.99, '1931-10-08'),
('Cannery Row', 12, 1, 12.99, '1945-01-01'),
('Childhood', 13, 2, 11.99, '1852-01-01'),
('A Midsummer Night''s Dream', 14, 5, 9.99, '1596-01-01'),
('Of Love and Other Demons', 15, 1, 14.99, '1994-01-01'),
('Lady Windermere''s Fan', 16, 1, 10.99, '1892-02-20'),
('Agnes Grey', 17, 1, 11.99, '1847-12-01'),
('A Feast for Crows', 18, 5, 18.99, '2005-10-17'),
('The Lost Symbol', 19, 7, 16.99, '2009-09-15'),
('Oryx and Crake', 20, 4, 16.99, '2003-05-01'),
('Harry Potter and the Order of the Phoenix', 1, 5, 22.99, '2003-06-21'),
('Homage to Catalonia', 2, 2, 14.99, '1938-04-25'),
('Mansfield Park', 5, 6, 11.99, '1814-07-01'),
('The Dead Zone', 6, 7, 14.99, '1979-08-01'),
('Peril at End House', 7, 3, 12.99, '1932-02-01'),
('Islands in the Stream', 8, 1, 15.99, '1970-01-01'),
('The Pickwick Papers', 9, 1, 13.99, '1837-03-31'),
('The Mysterious Stranger', 10, 1, 11.99, '1916-01-01'),
('Night and Day', 11, 1, 13.99, '1919-10-20'),
('The Pearl', 12, 1, 10.99, '1947-01-01'),
('The Cossacks', 13, 1, 12.99, '1863-01-01'),
('The Tempest', 14, 5, 9.99, '1611-01-01'),
('The General in His Labyrinth', 15, 10, 15.99, '1989-03-01'),
('An Ideal Husband', 16, 1, 10.99, '1895-01-03'),
('The Professor', 17, 1, 12.99, '1857-01-01'),
('A Dance with Dragons', 18, 5, 19.99, '2011-07-12'),
('Origin', 19, 7, 17.99, '2017-10-03'),
('The Year of the Flood', 20, 4, 16.99, '2009-09-22'),
('Harry Potter and the Half-Blood Prince', 1, 5, 22.99, '2005-07-16'),
('Keep the Aspidistra Flying', 2, 1, 13.99, '1936-04-20'),
('Northanger Abbey', 5, 6, 10.99, '1818-12-01'),
('11/22/63', 6, 4, 18.99, '2011-11-08'),
('The ABC Murders', 7, 3, 12.99, '1936-01-06'),
('To Have and Have Not', 8, 1, 13.99, '1937-10-15'),
('Little Dorrit', 9, 1, 14.99, '1857-06-01'),
('Personal Recollections of Joan of Arc', 10, 10, 13.99, '1896-05-01');

commit;