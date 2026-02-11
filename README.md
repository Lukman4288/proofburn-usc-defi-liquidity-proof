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

1. Locked liquidity
2. Committed supply
3. Deflationary mechanics
4. Burn-based tokenomics

But users must trust dashboards, announcements, or centralized reports.

There is no simple, standardized, and transparent primitive that:

1. Verifies liquidity commitment
2. Reduces circulating supply provably
3. Emits verifiable on-chain proof
4. Is composable with other DeFi systems

We built a minimal primitive to solve that.

🚀 The Solution

ProofBurn introduces a Liquidity Commitment Mechanism that:

1. Allows token holders to commit liquidity by burning tokens.
2. Permanently reduces total supply on-chain.
3. Emits structured on-chain events.
4. Enables real-time supply tracking.
5. Provides public verifiability of deflation.

This transforms liquidity commitment into a transparent and measurable on-chain action.

⚙️ How It Works
1. Smart Contract (ERC20-based)
2. Initial Supply: 1,000,000 PBT
3. Burn via commitLiquidity(uint256 amount)
4. Uses OpenZeppelin ERC20
5. Emits:

event LiquidityCommitted(
    address indexed user,
    uint256 amount,
    uint256 newTotalSupply,
    uint256 timestamp
);


Each burn:
1. Decreases totalSupply
2. Emits new total supply
3. Provides timestamped proof

No admin mint.
No hidden supply.
Fully on-chain verifiable.

🖥️ Frontend Dashboard

Built with:

1. React (Vite)
2. Ethers.js v6
3. Realtime event listeners
4. Deployed on Vercel

Dashboard shows:

1. Connected wallet
2. Current balance
3. Current total supply
4. Total burned
5. Burn percentage
6. Realtime burn history

Users can:

1. Connect wallet
2. Commit liquidity (burn tokens)
3. Instantly see supply reduction
4. View on-chain proof

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

1. Stateless
2. Transparent
3. Verifiable
4. Composable

🔍 Why This Matters for Creditcoin

Creditcoin focuses on trust, settlement, and verifiable value coordination.

ProofBurn aligns with this by:

1. Making liquidity commitment provable
2. Enabling deflationary primitives
3. Creating supply integrity layers
4. Serving as a foundation for DeFi coordination

This primitive can evolve into:

1. Cross-chain liquidity proof system
2. Collateral integrity module
3. DAO-governed burn vault
4. RWA-backed supply reduction tool
5. Treasury transparency engine

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
1. Deploy on Creditcoin testnet
2. Cross-chain proof layer
3. Burn registry indexer
4. On-chain analytics module

Phase 3 – DeFi Expansion
1. DAO governance
2. Treasury-controlled burn vault
3. Liquidity staking integration
4. Collateralized burn mechanics

🎥 Demo

Demo Video:
(Insert your video link here) = SOON 

The demo shows:
1. Wallet connection
2. Burning tokens
3. Total supply reduction
4. Realtime event update

🧩 Tech Stack
1. Solidity ^0.8.x
2. OpenZeppelin ERC20
3. Hardhat
4. React (Vite)
5. Ethers.js v6
6. Vercel (deployment)

🔐 Security
1. No mint after deployment
2. Burn reduces supply permanently
3. Uses battle-tested OpenZeppelin contracts
4. Minimal surface area
5. Transparent event-based accounting

👤 Author

Built during the CTC Hackathon period.
Original work.

📜 License

MIT
