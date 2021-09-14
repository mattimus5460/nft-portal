import { Contract, ethers } from "ethers";
import { getContractAt } from "@nomiclabs/hardhat-ethers/dist/src/helpers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { env } from "./env";
import { getProvider } from "./provider";

export function getContract(
    name: string,
    hre: HardhatRuntimeEnvironment
): Promise<Contract> {
    const WALLET = new ethers.Wallet(env("REACT_APP_ETH_PRIVATE_KEY"), getProvider());
    return getContractAt(hre, name, env("REACT_APP_NFT_CONTRACT_ADDRESS"), WALLET);
}