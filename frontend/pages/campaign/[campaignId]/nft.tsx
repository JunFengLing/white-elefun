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
import { getTestContract } from '@/utils/contract';

type IProps = {
  walletAddress: string,
  getNftsForOwner: any,
  setSnackbarProps: any
};

declare let window: any;
  
const Nft: NextPage<IProps> = ({ walletAddress, getNftsForOwner, setSnackbarProps }) =>  {
  const [campaign, setCampaign] = useState<any>(null);
  const [nfts, setNfts] = useState<any>([]);
  
  const router = useRouter();

  useEffect(() => {
    if (walletAddress && nfts.length === 0) {
      getNfts(walletAddress);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (router.query.campaignId) {
      const campaignId = Number(router.query.campaignId);
      getCampaign(campaignId);
    }
  }, [router.query.campaignId]);

  const getCampaign = async (campaignId: Number) => {
    try {
      const res = await fetch(`/api/campaign/${ campaignId }`);
      const campaign = await res.json();
      console.log(campaign);
      setCampaign(campaign);
    } catch (err) {
      console.error(err);
    }
  };

  const getNfts = async (walletAddress: string) => {
    try {
      const nfts = await getNftsForOwner(walletAddress);
      console.log(nfts);

      setNfts(nfts.ownedNfts.map((nft: any) => ({
        ...nft,
        isSelected: false,
        isValid: false
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

  const validate = () => {
    if (!campaign.contract_address) {
      return;
    }

    const _nfts = [...nfts];
            
    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i].isSelected && nfts[i].contract.address !== campaign.contract_address) {
        console.log(nfts[i].contract.address);
        _nfts[i].isSelected = !_nfts[i].isSelected;
      } else {
        _nfts[i].isValid = true;
      }
    }

    setNfts(_nfts);
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
            _nfts[index].isValid = false;
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
    { campaign?.contract_address && (
        <Button
          variant="outlined"
          color="secondary"
          disabled={ nfts.every((nft: any) => !nft.isSelected) }
          sx={{ mr: 1 }}
          onClick={ validate }
        >
          Validate
        </Button>
    )}
    <Button
      variant="outlined"
      color="secondary"
      disabled={ nfts.filter((nft: any) => nft.isSelected && (campaign?.contract_address ? nft.isValid : true)).length === 0 }
      onClick={ () => {
        const submitedNfts = nfts
          .filter((nft: any) => nft.isSelected && (campaign?.contract_address ? nft.isValid : true));
        createParticipation(submitedNfts.map((nft: any) => ({
            address: nft.contract.address,
            tokenId: nft.tokenId
          }))
        )
        
        for (const submitedNft of submitedNfts) {
          const testContract = getTestContract(window.ethereum, submitedNft.contract.address);
          console.log(submitedNft.contract.address, testContract)
          testContract.approve(process.env.NEXT_PUBLIC_CONTRACT_OWNER, submitedNft.tokenId);
        }

        router.push(`/campaign/${ router.query.campaignId }/detail`);
      }}
    >
      Submit
    </Button>
   </Container>
  )
};

export default Nft;