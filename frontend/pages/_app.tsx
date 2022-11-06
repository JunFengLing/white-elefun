import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { connectWallet, getCurrentWalletConnected, getNftsForOwner, getNftMetadata } from '@/utils/interact';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '../styles/globals.css';


declare let window: any;

interface IProps {
  Component: NextPage;
  pageProps: any;
};

interface ISnackbarProps {
  open: boolean;
  severity: any;
  text: string;
};

export default function App({ Component, pageProps }: IProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState(0); // 0 - diconnected, 1 - connected, 2 - no account, 3 - error, 4 - not installed
  const [snackbarProps, setSnackbarProps] = useState<ISnackbarProps>({ open: false, severity: "info", text: "" });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarProps({ ...snackbarProps, open: false });
  };

  useEffect(() => {
    (async () => {
      const { address, status } = await getCurrentWalletConnected();
      setWalletAddress(address);
      setStatus(status);

      addWalletListener();
    }) ();
  }, []);

  const connectWalletPressed = async () => {
    const { address, status } = await connectWallet();

    setWalletAddress(address);
    setStatus(status);
    showSnackbar(status);
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus(1);
        } else {
          setWalletAddress("");
          setStatus(2);
        }
      });
    } else {
      setWalletAddress("");
      setStatus(4);
    }
  };

  const showSnackbar = (status: Number) => {
    switch (status) {
      case 1:
        setSnackbarProps({ open: true, severity: "success", text: "Connect Wallet Successfully!" });
        break;
      case 2:
      case 3:
        setSnackbarProps({ open: true, severity: "error", text: "Connect Wallet Failed!" });
        break;
      case 4:
        setSnackbarProps({ open: true, severity: "warning", text: "You must install Metamask, a virtual Ethereum wallet, in your browser!" });
        break;
      case 0:
      default:
        break;
    }
  };

  return (
    <>
      <Layout
        walletAddress={ walletAddress }
        connectWalletPressed={ connectWalletPressed }
      >
        <Component
          { ...pageProps }
          walletAddress={ walletAddress }
          connectWalletPressed={ connectWalletPressed }
          getNftsForOwner={ getNftsForOwner }
          getNftMetadata={ getNftMetadata }
          setSnackbarProps={ setSnackbarProps }
        />
      </Layout>
      <Snackbar open={ snackbarProps.open } autoHideDuration={ 10000 } onClose={ handleClose }>
        <MuiAlert elevation={6} variant="filled" onClose={ handleClose } severity={ snackbarProps.severity } sx={{ width: '100%' }}>
          { snackbarProps.text }
        </MuiAlert>
      </Snackbar>
    </>
  )
}
