import React from 'react'
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/router'
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

type HeaderProps = {
  walletAddress: string,
  connectWalletPressed: any,
}

const Header: NextPage<HeaderProps> = ({ walletAddress, connectWalletPressed }) => {

  return (
    <ThemeProvider theme={ darkTheme }>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                White Elefun
            </Typography>
            <Button
              color="inherit"
              variant="outlined"  
              sx={{
                display: { xs: 'none', md: 'flex' }
              }}
              onClick={ connectWalletPressed }
            >
              { walletAddress.length > 0 ? (
                "Connected: " +
                String(walletAddress).substring(0, 6) +
                "..." +
                String(walletAddress).substring(38)
              ) : (
                "Connect Wallet"
              )}
            </Button>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                // variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                White Elefun
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              sx={{
                display: { xs: 'flex', md: 'none' },    
                fontSize: 10,
              }}
              onClick={ connectWalletPressed }
            >
              { walletAddress.length > 0 ? (
                "Connected: " +
                String(walletAddress).substring(0, 6) +
                "..." +
                String(walletAddress).substring(38)
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
