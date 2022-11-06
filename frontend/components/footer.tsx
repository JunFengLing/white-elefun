import React from 'react'
import type { NextPage } from 'next'
import {
  AppBar,
  Container,
  Typography
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const Footer: NextPage = () => {

  return (
    <footer>
      <ThemeProvider theme={ darkTheme }>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Container maxWidth="xl" sx={{ py: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
              }}
            >
              Contact: Follow us on @white_elefun Twitter
            </Typography>
          </Container>
        </AppBar>
      </ThemeProvider>
    </footer>
  )
}

export default Footer
