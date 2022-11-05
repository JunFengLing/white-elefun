// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event GetHolders(address[]);
	event GetNTFs(address[]);
	event GetTokenId(uint256[]);

	event GetNFTNum(uint256);

	event GetMaxHolderNum(uint256);
	event GetRand(uint256);
	event NFTAddressSwapped(address[]);
	event TokenIdSwapped(uint256[]);

	struct SingleUserInput {
		address owner;
		address[] NFTs;
	}

	address[] public swappedNFTView;
	uint256[] public swappedTokenIdView;
	
	constructor() {
		balances[tx.origin] = 10000;
	}

	function viewSwappedNFT() public view returns(address[] memory) {
		return swappedNFTView;
	}
	
	function viewSwappedId() public view returns(uint[] memory){
		return swappedTokenIdView; 
	}

	function operateSwap(address[] memory holders, address[] memory NFTs, uint256[] memory tokenIds) public returns(address[] memory, uint256[] memory) {
		emit GetHolders(holders);
		emit GetNTFs(NFTs);
		emit GetTokenId(tokenIds);

		uint256 numTotalNFT = holders.length;
		uint256 curCount = 1;
		uint256 maxHolderNum = 1;
		for (uint i = 1; i < numTotalNFT; i++){
			if (holders[i] == holders[i-1]){
				curCount += 1;
				if (curCount > maxHolderNum){
					maxHolderNum = curCount;
				}
			} else {
				curCount = 1;
			}
		}
		emit GetNFTNum(numTotalNFT);
		emit GetMaxHolderNum(maxHolderNum);
		
		uint256 offsetMin = maxHolderNum; // inclusive
		uint256 offsetMax = numTotalNFT - 1; // inclusive
		require(offsetMax >= offsetMin, '111 bad request');

		uint256 psuedoRand = (block.timestamp) % (offsetMax - offsetMin + 1) + offsetMin;
		// eventually need the list of NFTs, the list of holders, and the list of repeated holders (their # of NFTs, at the right position with NFT list)
		// output of the algorithm will be another list of NFTs (after move the amount of offset) 
		// Would be the best choice to use array as input & output - we don't need to convert back and forth from struct or map
		emit GetRand(psuedoRand);

		address[] memory swappedNFTs = new address[](numTotalNFT);
		uint256[] memory swappedTokenIds = new uint256[](numTotalNFT);	
		for (uint i = 0; i < numTotalNFT; i++) {
			uint256 offsetIndex = (i + psuedoRand)%numTotalNFT;
			address targetNFT = NFTs[offsetIndex];
			// address targetHolder = holders[offsetIndex];
			uint256 targetTokenId = tokenIds[offsetIndex];
			// address currentHolder = holders[i];
			swappedNFTs[i] = targetNFT;
			swappedTokenIds[i] = targetTokenId; 
			// Need to do the real swap logic, assign the pointed NFT to the current address
			// IERC721(targetNFT).safeTransferFrom(currentHolder, targetHolder, tokenId)
		}
		emit TokenIdSwapped(swappedTokenIds);
		emit NFTAddressSwapped(swappedNFTs);

		swappedNFTView = swappedNFTs;
		swappedTokenIdView = swappedTokenIds;
			
		return (swappedNFTs, swappedTokenIds);
	}

}
