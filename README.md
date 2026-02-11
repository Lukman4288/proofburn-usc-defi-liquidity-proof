ProofBurn – On-Chain Liquidity Commitment Primitive

A minimal, transparent, and verifiable liquidity commitment mechanism built for scalable DeFi ecosystems.

Live Demo:
https://proofburn-usc-defi-liquidity-proof.vercel.app

GitHub:
https://github.com/Lukman4288/proofburn-usc-defi-liquidity-proof

Testnet Deployment: Sepolia

🧠 The Problem

Liquidity claims in DeFi are often opaque.

Projects claim:

Locked liquidity

Committed supply

Deflationary mechanics

Burn-based tokenomics

But users must trust dashboards, announcements, or centralized reports.

There is no simple, standardized, and transparent primitive that:

Verifies liquidity commitment

Reduces circulating supply provably

Emits verifiable on-chain proof

Is composable with other DeFi systems

We built a minimal primitive to solve that.

🚀 The Solution

ProofBurn introduces a Liquidity Commitment Mechanism that:

Allows token holders to commit liquidity by burning tokens.

Permanently reduces total supply on-chain.

Emits structured on-chain events.

Enables real-time supply tracking.

Provides public verifiability of deflation.

This transforms liquidity commitment into a transparent and measurable on-chain action.

⚙️ How It Works
Smart Contract (ERC20-based)

Initial Supply: 1,000,000 PBT

Burn via commitLiquidity(uint256 amount)

Uses OpenZeppelin ERC20

Emits:

event LiquidityCommitted(
    address indexed user,
    uint256 amount,
    uint256 newTotalSupply,
    uint256 timestamp
);


Each burn:

Decreases totalSupply

Emits new total supply

Provides timestamped proof

No admin mint.
No hidden supply.
Fully on-chain verifiable.

🖥️ Frontend Dashboard

Built with:

React (Vite)

Ethers.js v6

Realtime event listeners

Deployed on Vercel

Dashboard shows:

Connected wallet

Current balance

Current total supply

Total burned

Burn percentage

Realtime burn history

Users can:

Connect wallet

Commit liquidity (burn tokens)

Instantly see supply reduction

View on-chain proof

🏗️ Architecture
User Wallet
    ↓
Frontend (React + Ethers)
    ↓
ProofBurn Smart Contract
    ↓
On-Chain Event Emission
    ↓
Realtime UI Update


Everything is:

Stateless

Transparent

Verifiable

Composable

🔍 Why This Matters for Creditcoin

Creditcoin focuses on trust, settlement, and verifiable value coordination.

ProofBurn aligns with this by:

Making liquidity commitment provable

Enabling deflationary primitives

Creating supply integrity layers

Serving as a foundation for DeFi coordination

This primitive can evolve into:

Cross-chain liquidity proof system

Collateral integrity module

DAO-governed burn vault

RWA-backed supply reduction tool

Treasury transparency engine

It is intentionally minimal — designed to be composable inside larger Creditcoin DeFi systems.

📦 Deployed Contracts

Network: Sepolia
Contract Address:

0x4E3bc91B437cd59eeB3774e6A53BaF9b0e9704f1


Explorer:
https://sepolia.etherscan.io/address/0x4E3bc91B437cd59eeB3774e6A53BaF9b0e9704f1

🛣️ Roadmap

Phase 1 – Hackathon MVP
✔ Deflationary token
✔ Burn-based liquidity commitment
✔ Realtime dashboard
✔ Public testnet deployment

Phase 2 – Creditcoin Integration

Deploy on Creditcoin testnet

Cross-chain proof layer

Burn registry indexer

On-chain analytics module

Phase 3 – DeFi Expansion

DAO governance

Treasury-controlled burn vault

Liquidity staking integration

Collateralized burn mechanics

🎥 Demo

Demo Video:
(Insert your video link here)

The demo shows:

Wallet connection

Burning tokens

Total supply reduction

Realtime event update

🧩 Tech Stack

Solidity ^0.8.x

OpenZeppelin ERC20

Hardhat

React (Vite)

Ethers.js v6

Vercel (deployment)

🔐 Security

No mint after deployment

Burn reduces supply permanently

Uses battle-tested OpenZeppelin contracts

Minimal surface area

Transparent event-based accounting

👤 Author

Built during the CTC Hackathon period.
Original work.

📜 License

MIT
