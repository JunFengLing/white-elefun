// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event GetHolders(address[]);
	event GetNTFs(address[]);
	event GetTokenId(string[]);

	event GetNFTNum(uint256);

	event GetMaxHolderNum(uint256);
	event GetRand(uint256);
	event NFTAddressSwapped(address[]);
	event TokenIdSwapped(string[]);
	event ConvertTokenId(string, uint256);

	struct SingleUserInput {
		address owner;
		address[] NFTs;
	}

	address[] public swappedNFTView;
	string[] public swappedTokenIdView;
	
	constructor() {
		balances[tx.origin] = 10000;
	}
    
	function viewSwappedNFT() public view returns(address[] memory) {
		return swappedNFTView;
	}
	
	function viewSwappedId() public view returns(string[] memory){
		return swappedTokenIdView; 
	}

	function getNumbers(address[] memory holders) internal returns(uint256){
		uint256 numTotalNFT = holders.length;
		uint256 curCount = 1;
		uint256 maxHolderNum = 1;
	
		emit GetNFTNum(numTotalNFT);
		emit GetMaxHolderNum(maxHolderNum);
		
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
		uint256 offsetMin = maxHolderNum; // inclusive
		uint256 offsetMax = numTotalNFT - 1; // inclusive
		require(offsetMax >= offsetMin, '111 bad request: one member hold too many');

		uint256 psuedoRand = (block.timestamp) % (offsetMax - offsetMin + 1) + offsetMin;
		return psuedoRand;
	}

	function stringToUint(string memory s) public returns (uint) {
		bytes memory b = bytes(s);
		uint result = 0;
		for (uint i = 0; i < b.length; i++) { 
			if (uint8(b[i]) >= 48 && uint8(b[i]) <= 57) {
				result = result * 10 + (uint8(b[i]) - 48); // bytes and int are not compatible with the operator -.
			}
		}
		return result; 
	}
	// Not needed. Should be guaranteed by the frontend that participants are legit owner, and request approval from our contract.

	// function checkOwner(address[] memory holders, address[] memory NFTs, string[] memory tokenIds) internal {
	// 	for (uint256 i = 0; i < holders.length; i++){
	// 		IERC721 nft = IERC721(NFTs[i]);
  	//       	address owner = nft.ownerOf(uint256(stringToUint(tokenIds[i])));
    //     	require(holders[i] == owner, '222 holder not owner of the NFT'); 
	// 	}
	// }
	
	function operateSwap(address[] memory holders, address[] memory NFTs, string[] memory tokenIds) public returns(address[] memory, string[] memory) {
		emit GetHolders(holders);
		emit GetNTFs(NFTs);
		emit GetTokenId(tokenIds);

		uint256 numTotalNFT = holders.length;
		uint256 psuedoRand = getNumbers(holders);
		// eventually need the list of NFTs, the list of holders, and the list of repeated holders (their # of NFTs, at the right position with NFT list)
		// output of the algorithm will be another list of NFTs (after move the amount of offset) 
		// Would be the best choice to use array as input & output - we don't need to convert back and forth from struct or map
		emit GetRand(psuedoRand);

		address[] memory swappedNFTs = new address[](numTotalNFT);
		string[] memory swappedTokenIds = new string[](numTotalNFT);	
		for (uint i = 0; i < numTotalNFT; i++) {
			uint256 offsetIndex = (i + psuedoRand)%(numTotalNFT);
			address targetNFT = NFTs[offsetIndex];
			// address targetHolder = holders[offsetIndex];
			string memory targetTokenId = tokenIds[offsetIndex];
			
			uint256 targetIntTokenId = stringToUint(targetTokenId);
			emit ConvertTokenId(targetTokenId, targetIntTokenId);
			// address currentHolder = holders[i];
			swappedNFTs[i] = targetNFT;
			swappedTokenIds[i] = targetTokenId; 
			// Need to do the real swap logic, assign the pointed NFT to the current address
			// IERC721(targetNFT).safeTransferFrom(holders[offsetIndex], holders[i], targetTokenId);
		}
		emit TokenIdSwapped(swappedTokenIds);
		emit NFTAddressSwapped(swappedNFTs);

		swappedNFTView = swappedNFTs;
		swappedTokenIdView = swappedTokenIds;
			
		return (swappedNFTs, swappedTokenIds);
	}

}

