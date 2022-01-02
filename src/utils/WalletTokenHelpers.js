import {ethers} from "ethers";
import {abi} from "../abi/SeedNFT.json";
import {get} from "axios";

let provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER_URL)
let contractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS
let seedNFTContract = new ethers.Contract(contractAddress, abi, provider)

export const getAllTokensForAddress = async (walletAddress) => {
    if (walletAddress) {
        let transactions = await filterForTransfersTo(walletAddress)

        if (transactions.length < 1)
            return;

        console.log("Found txns for %s ids: %s", walletAddress, transactions)
        let tokenIds = transactions
            .filter(t => t.args && t.args.to.toLowerCase() === walletAddress.toLowerCase())
            .map(t => {
                return t.args.tokenId.toNumber()
            });

        console.log("Found tokens for %s ids: %s", walletAddress, tokenIds)
        return tokenIds;
    } else
        return null;
}

export const getAllTokenUris = async (tokenIds) => {
    let results = await Promise.all(tokenIds.map(async (item) => {
        let tokenUri = await getTokenURIbyTokenId(item)

        return {tokenUri, tokenId: item}
    }));
    return results
}

export const getAllTokenJson = async (tokenUris) => {
    let results = await Promise.all(tokenUris.map(async (token) => {
        let resp = await get(token.tokenUri)
        return Object.assign(token, resp.data)
    }));
    return results
}

export const filterForTransfersTo = async (walletAddress) => {
    let filterTo = seedNFTContract.filters.Transfer(null, walletAddress, null)
    let filteredTransfersResp = await seedNFTContract.queryFilter(filterTo, 0)
    return filteredTransfersResp
}

export const getTokenURIbyTokenId = async (tokenId) => {
    let uriResp = await seedNFTContract.tokenURI(tokenId)
    return uriResp;
}

export const getTokenCategorybyTokenId = async (tokenId) => {
    let uriResp = await seedNFTContract.getTokenCategoryByIndex(tokenId)
    return uriResp;
}

export const checkOwnerOfTokenByIndex = async (address, tokenId) => {
    let ownerOfResp = await seedNFTContract.tokenOfOwnerByIndex(address, tokenId)
    return ownerOfResp;
}

export const checkOwnerOfTokenId = async (tokenId) => {
    let ownerOfResp = await seedNFTContract.ownerOf(tokenId)
    return ownerOfResp;
}

export const checkBalanceOfOwner = async (owner) => {
    let balanceOfResp = await seedNFTContract.balanceOf(owner)
    return balanceOfResp;
}