import express from "express";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

const abi = [
    "function storeMessage(string calldata newMessage) external",
    "function retrieveMessage() external view returns (string)",
  ];
  dotenv.config();
  const app = express();
  app.use(express.json());
  console.log("RPC:", process.env.ARBITRUM_RPC_URL);
console.log("Private Key:", process.env.PRIVATE_KEY?.slice(0, 6), "...");

  const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, abi, wallet);
  
  app.post("/api/store-message", async (req, res) => {
      try {
          const { message } = req.body;
          const tx = await contract.storeMessage(message);
          await tx.wait();
          res.json({ status: "Message stored", txHash: tx.hash });
      } catch (err) {
          res.status(500).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
      }
  });
  
  app.get("/api/retrieve-message", async (_, res) => {
      try {
          const message = await contract.retrieveMessage();
          res.json({ message });
      } catch (err) {
          res.status(500).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
      }
  });
  
  app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
  });