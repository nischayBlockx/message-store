import { expect } from "chai";
import { ethers } from "hardhat";

describe("MessageStore", () => {
    it("should store and retrieve a message", async () => {
        const [owner] = await ethers.getSigners();
        const MessageStore = await ethers.getContractFactory("MessageStore");
        const contract = await MessageStore.deploy();
        await contract.waitForDeployment();

        const testMessage = "Hello Blockchain";
        await contract.storeMessage(testMessage);

        expect(await contract.retrieveMessage()).to.equal(testMessage);
    });
});
