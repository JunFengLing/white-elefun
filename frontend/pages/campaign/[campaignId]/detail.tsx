import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { getProvider, getContract } from '@/utils/contract';
import type { NextPage } from 'next';


type IProps = {
  walletAddress: string,
  getNftMetadata: any
};

declare let window: any;

const Detail: NextPage<IProps> = ({ walletAddress, getNftMetadata }) =>  {
  const [campaign, setCampaign] = useState<any>(null);
  const [participations, setParticipations] = useState<any>([]);
  const [nfts, setNfts] = useState<any>([]);
  const [signer, setSigner] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [swappedNFTAddress, setSwappedNFTAddress] = useState<any>([]);
  const [swappedTokenId, setSwappedTokenId] = useState<any>([]);
  
  const router = useRouter();

  useEffect(() => {
    const provider = getProvider(window.ethereum);
    const signer = provider.getSigner();
    setSigner(signer);

    const _contract = getContract(signer);
    console.log('contract:', _contract);
    setContract(_contract);

    _contract.on({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    }, (event: any) => {
      console.log('event: ', event);
      if (event.event === "NFTAddressSwapped") {
        console.log('NFTAddressSwapped: ', event.args);
        setSwappedNFTAddress(event.args[0]); 
      }
      if (event.event === "TokenIdSwapped") {
        console.log('TokenIdSwapped: ', event.args);
        setSwappedTokenId(event.args[0]); 
      }
    });
  }, []);

  useEffect(() => {
    console.log('test', participations, swappedNFTAddress)
    if (swappedNFTAddress.length === participations.length) {
      let _participations = [...participations];
      for (let i = 0; i < _participations.length; i++) {
        _participations[i].contract_address_after = swappedNFTAddress[i]
      }
      console.log(_participations);
      setParticipations(_participations);
    }
  }, [swappedNFTAddress]);

  useEffect(() => {
    if (swappedTokenId.length === participations.length) {
      let _participations = [...participations];
      for (let i = 0; i < _participations.length; i++) {
        _participations[i].token_id_after = swappedTokenId[i]
      }
      console.log(_participations);
      setParticipations(_participations);
    }
  }, [swappedTokenId]);

  useEffect(() => {
    if (router.query.campaignId) {
      const campaignId = Number(router.query.campaignId);
      getCampaign(campaignId);
      getParticipations(campaignId);
    }
  }, [router.query.campaignId]);

  const swap = async (campaignId: Number) => {
    try {
      const res = await fetch(`/api/participation/${ campaignId }`);
      const participations = await res.json();

      const walletAddress: Array<string> = [];
      const contractAddress: Array<string> = [];
      const tokenId: Array<string> = [];

      for (const participation of participations) {
        walletAddress.push(participation.wallet_address);
        contractAddress.push(participation.contract_address_before);
        tokenId.push(participation.token_id_before);
      };
    
      const gasPrice = await signer.getGasPrice( )
      console.log('gasPrice: ', gasPrice);
      console.log('walletAddress:', walletAddress);
      console.log('contractAddress:', contractAddress);
      console.log('tokenId:', tokenId);
      const result = await contract.operateSwap(walletAddress, contractAddress, tokenId, { gasLimit: 10000000, gasPrice });
      console.log('result: ', result);
    } catch (err) {
      console.error(err);
    }
  };

  const getCampaign = async (campaignId: Number) => {
    try {
      const res = await fetch(`/api/campaign/${ campaignId }`);
      const campaign = await res.json();
      console.log('campaign: ', campaign);
      setCampaign(campaign);

      // if (campaign.status === 1) {

      // }

    } catch (err) {
      console.error(err);
    }
  };

  const getParticipations = async (campaignId: Number) => {
    try {
      const res = await fetch(`/api/participation/${ campaignId }`);
      const participations = await res.json();
      console.log('participations', participations);
      setParticipations(participations);

      const _nfts = [];
      for (const participation of participations) {
        const nftMetadata = await getNftMetadata(participation.contract_address_before, participation.token_id_before);
        _nfts.push(nftMetadata);
      }
      console.log(_nfts);
      setNfts(_nfts);

    } catch (err) {
      console.error(err);
    }
  };

  return (
   <Container sx={{ py: 1 }}>
    <Paper elevation={ 3 } sx={{ p: 3 }}>
    <Typography variant="subtitle1">
      Swap Detail
      <Button
        color="secondary"
        onClick={ async () => { swap(Number(router.query.campaignId)) }}
      >
        Swap
    </Button>
    </Typography>
    </Paper>
    <Paper elevation={ 3 } sx={{ mt: 3, p: 3 }}>
    <div style={{ display: 'flex' }}>
    <Typography sx={{ flex: 1, textAlign: 'center' }} variant="h5">
      Before
    </Typography>
    <Typography sx={{ flex: 1, textAlign: 'center'  }} variant="h5">
      After
    </Typography>
    </div>
    <ImageList cols={ 2 }>
      { participations
        .filter((participation: any) => participation.wallet_address === walletAddress )
        .map((participation: any) => {
        const nftBefore = nfts.find((nft: any) =>
          (nft.contract.address.toLowerCase() === participation.contract_address_before?.toLowerCase())
          && (nft.tokenId.toLowerCase() === participation.token_id_before?.toLowerCase()));
        const nftAfter = nfts.find((nft: any) =>
          (nft.contract.address.toLowerCase() === participation.contract_address_after?.toLowerCase())
          && (nft.tokenId.toLowerCase() === participation.token_id_after?.toLowerCase()));
        return (
        <React.Fragment key={ participation.id }>
          <ImageListItem>
            <img
              src={ nftBefore?.media[0]?.thumbnail || nftBefore?.media[0]?.gateway }
              alt={ nftBefore?.title }
              loading="lazy"
            />
            <ImageListItemBar
              title={ `Title: ${ nftBefore?.title }` }
              subtitle={
                <Typography variant="body2">
                  <span>{ `Description: ${ nftBefore?.description }` }</span>
                  <br />
                  <span>{ `Contract Address: ${ participation.contract_address_before }` }</span>
                  <br />
                  <span>{ `Token Id: ${ participation.token_id_before }` }</span>
                </Typography>
              }
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={ nftAfter?.media[0]?.thumbnail || nftAfter?.media[0]?.gateway }
              alt={ nftAfter?.title }
              loading="lazy"
            />
            { nftAfter && (
            <ImageListItemBar
              title={ `Title: ${ nftAfter?.title }` }
              subtitle={
                <Typography variant="body2">
                  <span>{ `Description: ${ nftAfter?.description }` }</span>
                  <br />
                  <span>{ `Contract Address: ${ participation.contract_address_after }` }</span>
                  <br />
                  <span>{ `Token Id: ${ participation.token_id_after }` }</span>
                </Typography>
              }
            />
            )}
          </ImageListItem>
        </React.Fragment>
        )
      })}
    </ImageList>
    </Paper>
   </Container>
  )
};

export default Detail;