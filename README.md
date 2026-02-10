# ProofBurn – USC DeFi Liquidity Proof

A minimal cross-chain liquidity commitment primitive for USC on Creditcoin.

## Overview

ProofBurn is a lightweight smart contract that enables liquidity commitment through irreversible burn mechanics. 

This mechanism provides:

- On-chain liquidity signaling
- Transparent commitment proof
- Verifiable burn records
- Foundation for DeFi primitives on Creditcoin

## Deployed Contract

Network: Sepolia Testnet  
Contract Address: 0x19Ca540066D5ea9dF6953f55ceBeA3676dB378Ab  

Etherscan:
https://sepolia.etherscan.io/address/0x19Ca540066D5ea9dF6953f55ceBeA3676dB378Ab

## How To Interact

Open Hardhat console:

npx hardhat console --network sepolia

Load contract:

const token = await ethers.getContractAt(
  "ProofBurnToken",
  "0x19Ca540066D5ea9dF6953f55ceBeA3676dB378Ab"
)

Commit liquidity:

await token.commitLiquidity(ethers.utils.parseEther("5"))

## Features

- Burn-based liquidity proof
- Public verifiable events
- Minimal gas footprint
- EVM compatible

## Tech Stack

- Solidity ^0.8.20
- Hardhat
- Ethers.js
- Sepolia Testnet deployment

## Future Extensions

- Cross-chain proof relay to Creditcoin
- Liquidity score calculation
- Integration with USC DeFi pools

## License

MIT
