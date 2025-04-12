import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./test",
    cache: "./cache"
  },
  networks: {
    arbitrum: {
      url: process.env.ARBITRUM_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
      chainId: 42161
    }
  }
};

export default config;
