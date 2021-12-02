import {env} from "./lib/env";
import {HardhatUserConfig, task, types} from "hardhat/config";
import {getWallet} from "./lib/wallet";

import "@nomiclabs/hardhat-ethers";
import {getContract} from "./lib/contract";
import {Contract} from "ethers";
import {TransactionResponse} from "@ethersproject/abstract-provider";

import("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
//
// const argv = JSON.parse(env("npm_config_argv"));
// if (argv.original !== ["hardhat", "test"]) {
//   require('dotenv').config();
// }

//import("./tasks/nft");


const config: HardhatUserConfig = {
    solidity: "0.8.6",
    networks: {
        hardhat: {
            chainId: 1337
        },
    }
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});


task("deploy-contract", "Deploy SeedNFT contract").setAction(async (_, hre) => {
    return hre.ethers
        .getContractFactory("SeedNFT")
        .then((contractFactory) => contractFactory.deploy())
        .then((result) => {
            process.stdout.write(`Contract address: ${result.address}`);
        });
});

task("mint-nft", "Mint an NFT")
    .addParam("tokenUri", "Your ERC721 Token URI", undefined, types.string)
    .addOptionalParam("category", "The category of your ERC721 Token", undefined, types.string)
    .setAction(async (params, hre) => {
        return params.category ?
            getContract("SeedNFT", hre)
                .then((contract: Contract) => {

                    const {tokenUri, category} = params
                    return contract.mintNFTWithCategory(env("REACT_APP_ETH_PUBLIC_KEY"), tokenUri, category, {
                        gasLimit: 500_000,
                    });
                })
                .then((tr: TransactionResponse) => {
                    process.stdout.write(`TX hash: ${tr.hash}`);
                })
            :
            getContract("SeedNFT", hre)
                .then((contract: Contract) => {

                    const {tokenUri} = params
                    return contract.mintNFT(env("REACT_APP_ETH_PUBLIC_KEY"), tokenUri, {
                        gasLimit: 500_000,
                    });
                })
                .then((tr: TransactionResponse) => {
                    process.stdout.write(`TX hash: ${tr.hash}`);
                });


    });

export default config;

//npx hardhat mint-nft --token-uri http://localhost:3000/test-nft-filter.json --network localhost --category filter