// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ProofBurnToken is ERC20 {

    address public constant BURN_ADDRESS = address(0x000000000000000000000000000000000000dEaD);

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

        _transfer(msg.sender, BURN_ADDRESS, amount);

        emit LiquidityCommitted(
            msg.sender,
            amount,
            block.timestamp
        );
    }
}
