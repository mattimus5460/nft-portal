import WalletContext from "./WalletContext";
import {useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {abi} from "../abi/SeedNFT.json"
import {get} from "axios";
import ImageOverlay from "./ImageOverlay";

const Redeem = (props) => {

    const {walletAddress} = useContext(WalletContext)
    //const {walletAddress} = props
    const [balanceOfOwner, setBalanceOfOwner] = useState()
    const [tokenIdsForWallet, setTokenIdsForWallet] = useState([])
    const [tokenUrisForWallet, setTokenUrisForWallet] = useState([])
    const [tokenJsonForWallet, setTokenJsonForWallet] = useState([])

    let provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER_URL)
    let contractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS
    let seedNFTContract = new ethers.Contract(contractAddress, abi, provider)

    const filterForTransfersTo = async (walletAddress) => {
        let filterTo = seedNFTContract.filters.Transfer(null, walletAddress, null)
        let filteredTransfersResp = await seedNFTContract.queryFilter(filterTo, 0)
        return filteredTransfersResp
    }

    useEffect(() => {
        if (walletAddress)
            filterForTransfersTo(walletAddress)
                .then(transactions => {
                    if (transactions.length < 1)
                        return;

                    let tokenIds = transactions
                        .filter(t => t.args && t.args.to.toLowerCase() === walletAddress.toLowerCase())
                        .map(t => {
                            return t.args.tokenId.toNumber()
                        });

                    console.log("Found tokens for %s ids: %s", walletAddress, ...tokenIds)
                    setTokenIdsForWallet(tokenIds)
                });
    }, [walletAddress])


    useEffect(() => {
        const getAllTokenUris = async (tokenIds) => {
            let results = await Promise.all(tokenIds.map(async (item) => {
                let tokenUri = await getTokenURIbyTokenId(item)

                //let tokenCategory = await getTokenCategorybyTokenId(item)

                return {tokenUri,  tokenId: item}
            }));
            return results
        }

        if (tokenIdsForWallet.length < 1)
            return

        getAllTokenUris(tokenIdsForWallet)
            .then(allTokenUris => {
                setTokenUrisForWallet(allTokenUris)
            })

    }, [tokenIdsForWallet])

    useEffect(() => {
        const getAllTokenJson = async (tokenUris) => {
            let results = await Promise.all(tokenUris.map(async (token) => {
                let resp = await get(token.tokenUri+'/metadata.json')
                return Object.assign(token, resp.data)
            }));
            return results
        }

        if (tokenUrisForWallet.length < 1)
            return

        getAllTokenJson(tokenUrisForWallet)
            .then(all => {
                setTokenJsonForWallet(all)
            })

    }, [tokenUrisForWallet])


    const getTokenURIbyTokenId = async (tokenId) => {
        let uriResp = await seedNFTContract.tokenURI(tokenId)
        return uriResp;
    }

    const getTokenCategorybyTokenId = async (tokenId) => {
        let uriResp = await seedNFTContract.getTokenCategoryByIndex(tokenId)
        return uriResp;
    }


    const checkOwnerOfTokenByIndex = async (address, tokenId) => {
        let ownerOfResp = await seedNFTContract.tokenOfOwnerByIndex(address, tokenId)
        return ownerOfResp;
    }

    const checkOwnerOfTokenId = async (tokenId) => {
        let ownerOfResp = await seedNFTContract.ownerOf(tokenId)
        return ownerOfResp;
    }

    const checkBalanceOfOwner = async (owner) => {
        let balanceOfResp = await seedNFTContract.balanceOf(owner)
        return balanceOfResp;
    }

    useEffect(() => {
        if (walletAddress)
            checkBalanceOfOwner(walletAddress)
                .then(balance => {
                    console.log("Found %s nfts for %s", balance.toNumber(), walletAddress)
                    setBalanceOfOwner(balance.toNumber())
                });
    }, [walletAddress])

    return (
        <div id="WalletContents">
            <div>
                {balanceOfOwner > 0 && (
                    "Total NFTS: " + balanceOfOwner
                )}
            </div>
            <div id="summary">
                {/*{tokenIdsForWallet.length > 0 && (*/}
                {/*    <p>*/}
                {/*        Token Ids:*/}
                {/*        {tokenIdsForWallet.map((t) => (*/}
                {/*            t + ','*/}
                {/*        ))}*/}
                {/*    </p>*/}
                {/*)}*/}

                {/*{tokenUrisForWallet && tokenUrisForWallet.length > 0 && (*/}
                {/*    <>*/}
                {/*        <p>Token URIs:</p>*/}
                {/*        <ul>*/}
                {/*            {tokenUrisForWallet.map((t) => (*/}
                {/*                <li key={t.tokenId}>{t.tokenUri}</li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    </>*/}
                {/*)}*/}

                {tokenJsonForWallet && tokenJsonForWallet.length > 0 && (
                    <>
                        {tokenJsonForWallet.filter(t => t.tokenUri).map((t) => (
                            <div className={'tokenFrame'}><p>{t.name}</p> <img src={t.image} alt={t.description}/><p>{t.tokenId}</p> {t.description} {t.tokenCategory}

                            <ImageOverlay image={t.image}/>

                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Redeem