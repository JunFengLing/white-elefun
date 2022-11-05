import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    name: 'Tian Lan'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    name: 'Map Shen',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    name: 'Jing Li',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    name: 'Joey Dai',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    name: 'Liyun Suo',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    name: 'Cai Chen'
  }
];

type IProps = {
  walletAddress: string,
  connectWalletPressed: any,
};

const Home: NextPage<IProps> = ({ walletAddress, connectWalletPressed }) =>  {

  const router = useRouter()

  return (
    <Container sx={{ py: 3 }}>
      <Paper elevation={ 3 } sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Introdcution
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
          quasi quidem quibusdam.
        </Typography>
        { walletAddress ? (
          <Button variant="outlined" color="secondary" onClick={ () => { router.push('/campaign') } }>
            Campaign
          </Button> ) : (
          <Button variant="outlined" color="secondary" onClick={ connectWalletPressed }>
            Connect Wallet to Start
          </Button>
        )}
      </Paper>
      <Paper elevation={ 3 } sx={{ mt: 3, p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Team
        </Typography>
        <ImageList cols={ 3 }>
        { itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={<span>by: {item.name}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
        </ImageList>
      </Paper>
    </Container>
  )
}

export default Home