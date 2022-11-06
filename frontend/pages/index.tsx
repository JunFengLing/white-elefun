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
import athena from '../public/athena.jpeg'
import jing from '../public/jing.jpeg'
import map from '../public/map.jpeg'
import skyblue from '../public/skyblue.jpeg'
import unclebig from '../public/unclebig.jpeg'
import { useRouter } from 'next/router';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { url } from 'inspector';


const itemData = [
  {
    img: athena,
    name: 'Athena'
  },
  {
    img: jing,
    name: 'Jing',
  },
  {
    img: map,
    name: 'Map',
  },
  {
    img: skyblue,
    name: 'Skyblue',
  },
  {
    img: unclebig,
    name: 'UncleBig'
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
    <Container sx={{ py: 3, paddingTop: '150px' }}>
      <Paper elevation={ 0 } sx={{ p: 4 }} style={{ background: 'none' }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', color: 'white', opacity: 1 }}>      
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', color: 'white', opacity: 1 }}>
          Looking for ways to engage your NFT communities?
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', color: 'white', opacity: 1 }}>      
       </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', color: 'white', opacity: 1 }}>
          Host or join NFT swap party with White Elefun!
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', color: 'white', opacity: 1 }}>      
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', color: 'white', opacity: 1 }}>
          Connect wallet to start hosting a swap party, or join existing parties ⬇
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'monospace', color: 'white', opacity: 1 }}>
               
        </Typography>
        { walletAddress ? (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 5, fontFamily: 'monospace' }}
            style={{ width: '300px', height: '80px', fontSize: '30px', color: 'white', borderColor: 'white' }}
            onClick={ () => { router.push('/campaign') } }
          >
            Campaign
          </Button> ) : (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 5, fontFamily: 'monospace' }}
            style={{ width: '600px', height: '80px', fontSize: '30px', color: 'white', borderColor: 'white' }} onClick={ connectWalletPressed }
          >
            Connect Wallet to Start
          </Button>
        )}
      </Paper>
      <Paper elevation={ 0 } sx={{ mt: 3, p: 3 }} style={{ background: 'none' }}>
        <Typography variant="h3" gutterBottom sx={{ fontFamily: 'monospace', textAlign: 'center', color: 'white', fontWeight: 700, opacity: 1 }}>
          Team
        </Typography>
        <ImageList cols={ 5 } sx={{ mt: 5 }}>
        { itemData.map((item: any, index: any) => (
          <ImageListItem key={index} sx={{ alignItems: 'center' }}>
            <ImageListItemBar
              title={ <span style={{ fontSize: '20px', color: 'white', fontFamily: 'monospace' }}>{ item.name }</span> }
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