# STX Impact Grants

A conditional crowdfunding protocol built on Stacks and Bitcoin. It allows donors to lock funds that are only released once specific on-chain time-based milestones are met.

## Why This is Unique
Most grant platforms are either centralized or release funds instantly. **Impact Grants** uses the security of Bitcoin's block production to ensure transparency in when and how funds are distributed.

## Integration Highlights
- **Reown AppKit**: We use the Social Login feature (`email` & `socials`) to allow non-crypto users to participate in social causes without needing to manage seed phrases initially.
- **Clarity Smart Contract**: Implements a strict escrow logic where funds are held by the contract principal, not an individual.

## Installation

```bash
# Install dependencies
npm install @reown/appkit @reown/appkit-adapter-stacks @stacks/connect @stacks/transactions

# Set up environment
# Update contractAddress in GrantCreator.tsx with your deployed address
