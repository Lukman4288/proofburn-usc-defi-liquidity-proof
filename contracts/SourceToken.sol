// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ProofBurnToken is ERC20 {

    event LiquidityCommitted(
        address indexed user,
        uint256 amount,
        uint256 timestamp
    );

    constructor() ERC20("ProofBurn Token", "PBT") {
        _mint(msg.sender, 1000000 ether);
    }

    function commitLiquidity(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Not enough balance");

        _burn(msg.sender, amount);

        emit LiquidityCommitted(
            msg.sender,
            amount,
            block.timestamp
        );
    }
}
