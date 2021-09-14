import { deployTestContract, getTestWallet } from "./test-helpers";
import { waffle, run } from "hardhat";
import { expect } from "chai";
import sinon from "sinon";
import * as provider from "../lib/provider";
import {Contract} from "ethers";

describe("tasks", () => {
    beforeEach(async () => {
        sinon.stub(provider, "getProvider").returns(waffle.provider);
        const wallet = getTestWallet();
        sinon.stub(process, "env").value({
            REACT_APP_ETH_PUBLIC_KEY: wallet.address,
            REACT_APP_ETH_PRIVATE_KEY: wallet.privateKey,
        });
    });

    describe("deploy-contract", () => {
        it("calls through and returns the transaction object", async () => {
            sinon.stub(process.stdout, "write");

            await run("deploy-contract");

            await expect(process.stdout.write).to.have.been.calledWith(
                "Contract address: 0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0"
            );
        });
    });

    describe("mint-nft", () => {
        const TOKEN_URI = "http://example.com/ip_records/42";
        let deployedContract: Contract;

        beforeEach(async () => {
            deployedContract = await deployTestContract("SeedNFT");
            process.env.REACT_APP_NFT_CONTRACT_ADDRESS = deployedContract.address;
        });

        it("calls through and returns the transaction object", async () => {
            sinon.stub(process.stdout, "write");

            await run("mint-nft", { tokenUri: TOKEN_URI });

            await expect(process.stdout.write).to.have.been.calledWith(
                "TX hash: 0x25c9bf4ab27a8207b0ea9c8b3b2bd05d15946a128571674fe883b6aca966860d"
            );

            await expect(
                await deployedContract.callStatic.tokenURI("1")
            ).to.eq(TOKEN_URI);
        });
    });
});