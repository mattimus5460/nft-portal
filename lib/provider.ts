import { ethers } from "ethers";

export function getProvider(): ethers.providers.Provider {
    return ethers.getDefaultProvider("http://localhost:8545");
}