import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Paper, Box, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Header({ setSearchTerm }) {
  const theme = useTheme();

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Google Keep Clone
        </Typography>
        <Paper 
          elevation={3} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' },
            ml: { sm: 1 },
          }}
        >
          <Box 
            sx={{ 
              position: 'relative',
              borderRadius: 1,
              backgroundColor: 'common.white',
              width: '100%',
            }}
          >
            <Box
              sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                color: 'inherit',
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: '8px 8px 8px 0',
                  paddingLeft: `calc(1em + 32px)`,
                  transition: theme.transitions.create('width'),
                  width: '100%',
                  [theme.breakpoints.up('sm')]: {
                    width: '40ch',
                    '&:focus': {
                      width: '50ch',
                    },
                  },
                },
              }}
            />
          </Box>
        </Paper>
      </Toolbar>
    </AppBar>
  );
}

export default Header;