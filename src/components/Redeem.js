import WalletContext from "./WalletContext";
import {useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {abi} from "../abi/SeedNFT.json"
import {get} from "axios";
import ImageOverlay from "./ImageOverlay";
import {
    checkBalanceOfOwner,
    getAllTokenJson,
    getAllTokensForAddress,
    getAllTokenUris
} from "../utils/WalletTokenHelpers";

const Redeem = (props) => {

    const {walletAddress} = useContext(WalletContext)
    const [balanceOfOwner, setBalanceOfOwner] = useState()
    const [tokenJsonForWallet, setTokenJsonForWallet] = useState([])

    useEffect(() => {
        const loadAll = async () => {
            console.log("getting all tokens for %s", walletAddress)
            let tokenIdsForWallet = await getAllTokensForAddress(walletAddress)

            if (!tokenIdsForWallet) {
                console.log("No tokens for %s ids", walletAddress)
                return;
            }

            console.log("Found tokens for %s ids: %s", walletAddress, ...tokenIdsForWallet)
            let allTokenUris = await getAllTokenUris(tokenIdsForWallet)

            let all = await getAllTokenJson(allTokenUris)
            return all
        }
        loadAll().then((all) => {
            setTokenJsonForWallet(all)
        })
    }, [walletAddress])

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