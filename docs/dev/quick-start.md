---
id: quick-start
title: Quick Start Guide
sidebar_label: Quick Start
---

# Quick Start Guide

Get your Eagle Omnichain Vault up and running in **10 minutes**!

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- **Git** for version control
- **Private key** with test ETH on target networks
- **RPC URLs** for target chains
- Basic understanding of **Hardhat** and **LayerZero**

## 📦 **Step 1: Clone and Setup**

### Clone the Repository
```bash
# Clone the Eagle OVault repository
git clone https://github.com/47-Eagle/eagle-ovault-clean.git
cd eagle-ovault-clean

# Install dependencies
npm install
```

### Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**
```bash
# Private Keys
PRIVATE_KEY=0x1234...  # Your deployment private key
MNEMONIC=your twelve word mnemonic phrase here

# RPC URLs  
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR-KEY
BSC_RPC=https://bsc-dataseed1.binance.org/
ARBITRUM_RPC=https://arb1.arbitrum.io/rpc
BASE_RPC=https://mainnet.base.org
AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc

# API Keys (optional, for verification)
ETHERSCAN_API_KEY=ABC123
BSCSCAN_API_KEY=DEF456
ARBISCAN_API_KEY=GHI789
```

## Step 2: Deploy Hub Chain (Ethereum)

### Deploy to Ethereum Mainnet
```bash
# Deploy all hub chain contracts
npx hardhat deploy:eagle-ovault --network ethereum

# Verify contracts (optional)
npx hardhat verify:all --network ethereum
```

### Expected Output
```
🦅 Eagle OVault Deployment Started...

✅ WLFI AssetOFT deployed: 0x47...EA91E
✅ USD1 AssetOFT deployed: 0x47...EA91F  
✅ EagleOVault deployed: 0x47...EA920
✅ ShareOFTAdapter deployed: 0x47...EA921
✅ EagleComposer deployed: 0x47...EA922

Deployment Complete! Total gas: 12.3 ETH
```

## Step 3: Deploy Spoke Chains

Deploy to all spoke chains in parallel:

```bash
# Deploy to BSC
npx hardhat deploy:eagle-ovault --network bsc &

# Deploy to Arbitrum  
npx hardhat deploy:eagle-ovault --network arbitrum &

# Deploy to Base
npx hardhat deploy:eagle-ovault --network base &

# Deploy to Avalanche
npx hardhat deploy:eagle-ovault --network avalanche &

# Wait for all deployments
wait
```

## Step 4: Configure Cross-Chain Connections

### Set Trusted Remotes
```bash
# Configure LayerZero connections
npx hardhat configure:trusted-remotes --network ethereum
npx hardhat configure:trusted-remotes --network bsc  
npx hardhat configure:trusted-remotes --network arbitrum
npx hardhat configure:trusted-remotes --network base
npx hardhat configure:trusted-remotes --network avalanche
```

### Verify Connections
```bash
# Test cross-chain connectivity
npx hardhat test:cross-chain --from ethereum --to bsc
npx hardhat test:cross-chain --from bsc --to arbitrum
```

## 🧪 **Step 5: Test Your Deployment**

### Local Testing
```bash
# Run comprehensive test suite
npm test

# Test specific functionality
npx hardhat test test/EagleOVault.test.ts
npx hardhat test test/CrossChain.test.ts
```

### Live Network Testing
```bash
# Test vault deposit
npx hardhat ovault:deposit-dual \
  --vault 0x47...EA920 \
  --wlfi 1000 \
  --usd1 1000 \
  --network ethereum

# Test cross-chain withdrawal
npx hardhat ovault:withdraw-dual \
  --vault 0x47...EA920 \
  --shares 500 \
  --to-chain bsc \
  --network ethereum
```

## Step 6: Monitor Your Vault

### Get Vault Information
```bash
# Check vault status
npx hardhat ovault:info --vault 0x47...EA920 --network ethereum

# Monitor cross-chain operations
npx hardhat monitor:cross-chain --vault 0x47...EA920
```

### Expected Output
```json
{
  "vault": "0x47...EA920",
  "totalAssets": "50000.00 USD",
  "totalSupply": "48500.00 EAGLE",
  "sharePrice": "1.031 USD",
  "wlfiBalance": "25000.00 WLFI",
  "usd1Balance": "25000.00 USD1",
  "apy": "12.5%",
  "chains": ["ethereum", "bsc", "arbitrum", "base", "avalanche"]
}
```

## Common Operations

### Vault Management
```bash
# Rebalance portfolio
npx hardhat ovault:rebalance --vault 0x47...EA920 --network ethereum

# Emergency pause
npx hardhat ovault:pause --vault 0x47...EA920 --network ethereum

# Update slippage limits
npx hardhat ovault:set-slippage --vault 0x47...EA920 --slippage 500 --network ethereum
```

### Cross-Chain Operations
```bash
# Bridge WLFI tokens
npx hardhat bridge:wlfi --amount 1000 --from ethereum --to bsc

# Bridge vault shares
npx hardhat bridge:shares --amount 500 --from bsc --to arbitrum
```

## 🐛 **Troubleshooting**

### Common Issues

**❌ Deployment Failed**
```bash
# Check network configuration
npx hardhat network:verify --network ethereum

# Verify account balance
npx hardhat account:balance --network ethereum
```

**❌ Cross-Chain Message Failed**  
```bash
# Check LayerZero status
npx hardhat layerzero:status --tx 0xabc... --network ethereum

# Retry failed message
npx hardhat layerzero:retry --tx 0xabc... --network ethereum
```

**❌ Insufficient Gas**
```bash
# Estimate gas for operation
npx hardhat gas:estimate --operation deposit --network ethereum

# Check current gas prices
npx hardhat gas:price --network ethereum
```

## Advanced Configuration

### Custom Vanity Addresses
```typescript
// In deploy config
export const VANITY_CONFIG = {
  targetPrefix: '47',      // Your custom prefix
  targetSuffix: 'EA91E',   // Your custom suffix
  maxAttempts: 1000000     // Generation attempts
}
```

### Custom Slippage Settings  
```typescript
// In vault config
export const SLIPPAGE_CONFIG = {
  maxSlippage: 500,        // 5% max slippage
  twapPeriod: 3600,        // 1 hour TWAP
  rebalanceThreshold: 200  // 2% rebalance threshold
}
```

## Next Steps

Now that you have Eagle Vault running, explore these topics:

1. **[Architecture Deep Dive](./architecture)** - Understand the system design
2. **🔒 [Security Guide](./security)** - Production security considerations  
3. **[API Reference](../api/overview)** - Complete function documentation
4. **🧪 [Testing Guide](./testing)** - Comprehensive testing strategies

## Pro Tips

- **Use vanity addresses** for professional deployments
- **Test on testnets first** before mainnet deployment
- **Monitor gas prices** during deployment for cost optimization
- **Set up monitoring** for production vaults
- **Keep private keys secure** and use hardware wallets for production

---

**Congratulations! Your Eagle Omnichain Vault is now live and ready for use!**

