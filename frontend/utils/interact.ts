import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

declare let window: any;

export const connectWallet = async () => {
  const obj = {
    status: 0,
    address: ""
  };
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      obj.address = addressArray[0];
      obj.status = 1;
      return obj;
    } catch (err: any) {
      obj.status = 3;
      return obj;
    }
  } else {
    obj.status = 4;
    return obj;
  }
};

export const getCurrentWalletConnected = async () => {
  const obj = {
    status: 0,
    address: ""
  };
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        obj.address = addressArray[0];
        obj.status = 1;
        return obj;
      } else {
        obj.status = 2;
        return obj;
      }
    } catch (err: any) {
      obj.status = 3;
      return obj;
    }
  } else {
    obj.status = 4;
    return obj;
  }
};

export const getNftsForOwner = async (owner: string) => {
  return alchemy.nft.getNftsForOwner(owner);
};

export const getNftMetadata = async (contractAddress: string, tokenId: string) => {
  return alchemy.nft.getNftMetadata(contractAddress, tokenId);
};
