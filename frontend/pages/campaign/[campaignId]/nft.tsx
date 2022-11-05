import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';


type IProps = {
  walletAddress: string,
  getNftsForOwner: any,
  setSnackbarProps: any
};
  
const Nft: NextPage<IProps> = ({ walletAddress, getNftsForOwner, setSnackbarProps }) =>  {
  const [nfts, setNfts] = useState<any>([]);
  
  const router = useRouter();

  useEffect(() => {
    if (walletAddress && nfts.length === 0) {
      getNfts(walletAddress);
    }
  }, [walletAddress]);

  const getNfts = async (walletAddress: string) => {
    try {
      const nfts = await getNftsForOwner(walletAddress);
      console.log(nfts);
      setNfts(nfts.ownedNfts.map((nft: any) => ({
        ...nft,
        isSelected: false
      })));
    } catch (err) {
      console.error(err);
    }
  };

  const createParticipation = async (payloads: Array<any>) => {
    console.log(payloads)
    try {
      const res = await fetch('/api/participation', {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          campaignId: Number(router.query.campaignId),
          walletAddress,
          payloads
        })
      });
      const participation = await res.json();
      console.log(participation);
      setSnackbarProps({ open: true, severity: "success", text: "Participate Successfully!" });
    } catch (err) {
    }
  };

  return (
   <Container sx={{ py: 1 }}>
    <Typography variant="subtitle1" gutterBottom>
      Choose NFT to Swap
    </Typography>
    <ImageList cols={ 3 }>
     { nfts.map((nft: any, index: any) => (
        <ImageListItem
          key={ index }
          sx={ nft.isSelected ? { border: 5, borderColor: 'secondary.main' } : {} }
          onClick={ () => {
            const _nfts = [...nfts];
            _nfts[index].isSelected = !_nfts[index].isSelected;
            setNfts(_nfts);
          } }
        >
          <img
            src={ nft?.media[0]?.thumbnail || nft?.media[0]?.gateway }
            alt={ nft.title }
            loading="lazy"
          />
          <ImageListItemBar
            title={ nft.title }
            subtitle={ <span>{ nft.description }</span> }
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Button
      variant="outlined"
      color="secondary"
      disabled={ nfts.every((nft: any) => !nft.isSelected) }
      sx={{ mr: 1 }}
      onClick={ () => {} }
    >
      Validate
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      disabled={ nfts.every((nft: any) => !nft.isSelected) }
      onClick={ () => {
        createParticipation(nfts
          .filter((nft: any) => nft.isSelected)
          .map((nft: any) => ({
            address: nft.contract.address,
            tokenId: nft.tokenId
          }))
        )}
      }
    >
      Submit
    </Button>
   </Container>
  )
};

export default Nft;