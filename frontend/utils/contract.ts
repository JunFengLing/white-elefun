import { ethers } from "ethers";


const contractABI = require("../contract-abi.json");
const testABI = require("../test_abi.json");
const contractAddress: any = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
console.log('contractAddress: ', contractAddress)

export const getProvider = (provider: any): any => {
  return new ethers.providers.Web3Provider(provider);
};

export const getContract = (signer: any,): any => {
  return new ethers.Contract(contractAddress, contractABI.abi, signer);
}

export const getTestContract = (provider: any, contractAddress: any): any => {
  const newProvider = new ethers.providers.Web3Provider(provider);
  const signer = newProvider.getSigner();
  return new ethers.Contract(contractAddress, testABI, signer);
}