// src/theme.js
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5B6BF8', // Erino's purple/blue color
      light: '#7C89F9',
      dark: '#4555F7'
    },
    background: {
      default: '#F8F9FE',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1A1F36',
      secondary: '#4E5D78'
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h6: {
      fontWeight: 600
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '16px',
          boxShadow: 'none'
        },
        contained: {
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
        }
      }
    }
  }
});