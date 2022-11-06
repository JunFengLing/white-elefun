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
import Image from 'next/image';
import tianLanImg from '../public/tian_lan.jpeg'
import { useRouter } from 'next/router';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { url } from 'inspector';


const itemData = [
  {
    img: tianLanImg,
    name: 'Tian Lan'
  },
  {
    img: tianLanImg,
    name: 'Map Shen',
  },
  {
    img: tianLanImg,
    name: 'Jing Li',
  },
  {
    img: tianLanImg,
    name: 'Joey Dai',
  },
  {
    img: tianLanImg,
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
    <div className="home">
    <Container sx={{ py: 3 }}>
      <Paper elevation={ 0 } sx={{ p: 3 }} style={{ background: 'none' }}>
        <Typography variant="h1" gutterBottom style={{ color: 'white', fontWeight: 700, opacity: 1 }}>
          Introdcution
        </Typography>
        <Typography variant="h5" gutterBottom style={{ color: 'white', opacity: 1 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
          quasi quidem quibusdam.
        </Typography>
        { walletAddress ? (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 6 }}
            style={{ width: '300px', height: '80px', fontSize: '30px', color: 'white', borderColor: 'white' }}
            onClick={ () => { router.push('/campaign') } }
          >
            Campaign
          </Button> ) : (
          <Button variant="outlined" color="secondary" onClick={ connectWalletPressed }>
            Connect Wallet to Start
          </Button>
        )}
      </Paper>
      <Paper elevation={ 0 } sx={{ mt: 3, p: 3 }} style={{ background: 'none' }}>
        <Typography variant="h3" gutterBottom style={{ textAlign: 'center', color: 'white', fontWeight: 700, opacity: 1 }}>
          Team
        </Typography>
        <ImageList cols={ 5 } sx={{ mt: 5 }}>
        { itemData.map((item: any, index: any) => (
          <ImageListItem key={index} sx={{ alignItems: 'center' }}>
            <ImageListItemBar
              title={ <span style={{ fontSize: '20px', color: 'white' }}>{ item.name }</span> }
              // subtitle={<span>by: {item.name}</span>}
              position="below"
            />
            <Image
              src={item.img}
              alt={item.name}
              width={140}
              height={140}
              style={{ borderRadius: '50%' }}
            />
            {/* <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            /> */}
          </ImageListItem>
        ))}
        </ImageList>
      </Paper>
    </Container>
    </div>
  )
}

export default Home