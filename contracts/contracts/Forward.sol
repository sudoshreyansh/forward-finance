// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol"; // Import the ERC-20 interface

contract Forward {
    address private _usdcAddress; // Replace with the actual USDC token address
    address private owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address usdcAddress) {
      this._usdcAddress = usdcAddress;
      owner = msg.sender;
    }

    function transferUSDC(uint256 amount) external onlyOwner {
        IERC20 usdcToken = IERC20(usdcAddress);

        // Ensure that the contract has enough balance before transferring
        require(usdcToken.balanceOf(address(this)) >= amount, "Insufficient balance");

        // Transfer USDC from the contract to itself
        require(usdcToken.transfer(address(this), amount), "Transfer failed");
    }

    // Add additional functions or modifiers as needed
}
