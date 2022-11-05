import { ethers } from "ethers";


const contractABI = require("../contract-abi.json");
const contractAddress: any = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const getProvider = (provider: any): any => {
  return new ethers.providers.Web3Provider(provider);
};

export const getContract = (signer: any): any => {
  return new ethers.Contract(contractAddress, contractABI.abi, signer);
}