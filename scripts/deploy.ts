import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    const MessageStore = await ethers.getContractFactory("MessageStore");
    const contract = await MessageStore.deploy();
    await contract.waitForDeployment();

    console.log(`Contract deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
