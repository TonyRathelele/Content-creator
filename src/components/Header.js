import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ImageIcon from '@mui/icons-material/Image';

const Header = () => {
  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
      boxShadow: '0 3px 5px 2px rgba(255, 107, 107, .3)'
    }}>
      <Toolbar>
        <SchoolIcon sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Primary School Content Generator
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            startIcon={<ImageIcon />}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            Generate Image
          </Button>
          <Typography variant="body2" sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 12px',
            borderRadius: '12px'
          }}>
            Powered by Gemini AI
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 