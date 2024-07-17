const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getStats = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Get total books
    const [totalBooksResult] = await connection.query('SELECT COUNT(*) as totalBooks FROM books');
    const totalBooks = totalBooksResult[0].totalBooks;

    // Get total authors
    const [totalAuthorsResult] = await connection.query('SELECT COUNT(DISTINCT author_id) as totalAuthors FROM books');
    const totalAuthors = totalAuthorsResult[0].totalAuthors;

    // Get most popular genre
    const [mostPopularGenreResult] = await connection.query(
      'SELECT genre_name, COUNT(*) as count FROM books GROUP BY genre_name ORDER BY count DESC LIMIT 1'
    );
    const mostPopularGenre = mostPopularGenreResult.length > 0 ? mostPopularGenreResult[0].genre_name : 'N/A';

    console.log('mostPopularGenreResult:', mostPopularGenreResult); // Log the result

    connection.release();

    res.json({
      totalBooks,
      totalAuthors,
      mostPopularGenre
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getStats };
