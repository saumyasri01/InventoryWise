import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line
import { Box, Typography, Icon } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

const QuickStatsBar = () => {
  const [stats, setStats] = useState({ totalBooks: 0, totalAuthors: 0, mostPopularGenre: '' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', bgcolor: '#add8e6', py: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <BookIcon sx={{ mr: 1 }} />
        <Typography>{stats.totalBooks} Books</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PersonIcon sx={{ mr: 1 }} />
        <Typography>{stats.totalAuthors} Authors</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CategoryIcon sx={{ mr: 1 }} />
        <Typography>Leading Genre: {stats.mostPopularGenre}</Typography>
      </Box>
    </Box>
  );
};

export default QuickStatsBar;