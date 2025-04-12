// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MessageStore is Ownable {
    string private message;

    event MessageStored(address indexed sender, string message);

    constructor() Ownable(msg.sender) {}

    function storeMessage(string calldata newMessage) external onlyOwner {
        require(bytes(newMessage).length > 0, "Message cannot be empty");
        message = newMessage;
        emit MessageStored(msg.sender, newMessage);
    }

    function retrieveMessage() external view returns (string memory) {
        return message;
    }
}
