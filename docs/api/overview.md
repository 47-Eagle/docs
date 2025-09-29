---
id: overview
title: API Reference Overview
sidebar_label: API Overview
---

# API Reference Overview

Complete reference for all Eagle Omnichain Vault APIs, including smart contract functions and Hardhat tasks.

## API Categories

### Vault Operations
Core vault functionality for deposits, withdrawals, and management:
- **Deposit Functions**: Single and dual-token deposits
- **Withdrawal Functions**: Flexible redemption options  
- **Management Functions**: Rebalancing and configuration
- **View Functions**: Real-time vault status and analytics

### Cross-Chain APIs
LayerZero-powered omnichain operations:
- **Asset Bridging**: WLFI and USD1 cross-chain transfers
- **Share Management**: Vault share distribution across chains
- **Message Handling**: Cross-chain communication protocols
- **Fee Estimation**: Gas and LayerZero fee calculations

### Hardhat Tasks
Development and deployment automation:
- **Deployment Tasks**: Automated contract deployment
- **Configuration Tasks**: Network and protocol setup
- **Testing Tasks**: Integration and cross-chain testing
- **Monitoring Tasks**: Real-time system monitoring

## Quick Links

<div style={{display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', margin: '2rem 0'}}>

<div style={{padding: '1.5rem', border: '2px solid #4f46e5', borderRadius: '12px', textAlign: 'center'}}>
  <h3 style={{margin: '0 0 1rem 0', color: '#4f46e5'}}>Vault Operations</h3>
  <p style={{margin: '0 0 1rem 0', color: '#6b7280'}}>Deposit, withdraw, and manage vault positions</p>
  <a href="./vault-operations" style={{color: '#4f46e5', fontWeight: 'bold', textDecoration: 'none'}}>→ Explore Vault APIs</a>
</div>

<div style={{padding: '1.5rem', border: '2px solid #10b981', borderRadius: '12px', textAlign: 'center'}}>
  <h3 style={{margin: '0 0 1rem 0', color: '#10b981'}}>Cross-Chain</h3>
  <p style={{margin: '0 0 1rem 0', color: '#6b7280'}}>LayerZero omnichain functionality</p>
  <a href="./cross-chain" style={{color: '#10b981', fontWeight: 'bold', textDecoration: 'none'}}>→ Cross-Chain Reference</a>
</div>

<div style={{padding: '1.5rem', border: '2px solid #f59e0b', borderRadius: '12px', textAlign: 'center'}}>
  <h3 style={{margin: '0 0 1rem 0', color: '#f59e0b'}}>Hardhat Tasks</h3>
  <p style={{margin: '0 0 1rem 0', color: '#6b7280'}}>Development and deployment tools</p>
  <a href="./hardhat-tasks" style={{color: '#f59e0b', fontWeight: 'bold', textDecoration: 'none'}}>→ Task Reference</a>
</div>

</div>

## Contract Architecture

### **Hub Chain Contracts (Ethereum)**

```mermaid
graph TB
    subgraph "Hub Chain APIs"
        EV[EagleOVault<br/>Core Vault Functions]
        SA[ShareOFTAdapter<br/>Cross-Chain Bridge]
        EC[EagleComposer<br/>Operation Orchestrator]
        WA[WLFI AssetOFT<br/>Token Hub]
        UA[USD1 AssetOFT<br/>Token Hub]
    end
    
    subgraph "👤 User Interactions"
        DEP[deposit()<br/>depositDual()]
        WITH[withdraw()<br/>redeemDual()]
        BRIDGE[send()<br/>sendFrom()]
        COMPOSE[composeDeposit()<br/>composeWithdraw()]
    end
    
    DEP --> EV
    WITH --> EV
    BRIDGE --> SA
    BRIDGE --> WA
    BRIDGE --> UA
    COMPOSE --> EC
    
    style EV fill:#4f46e5,stroke:#312e81,color:#fff
    style SA fill:#059669,stroke:#047857,color:#fff
    style EC fill:#dc2626,stroke:#991b1b,color:#fff
```

### **Spoke Chain Contracts**

```mermaid
graph TB
    subgraph "Spoke Chain APIs"
        SO[ShareOFT<br/>Vault Shares]
        WO[WLFI OFT<br/>Asset Token]
        UO[USD1 OFT<br/>Asset Token]
    end
    
    subgraph "👤 User Functions"
        SEND[send()<br/>Cross-chain transfer]
        BAL[balanceOf()<br/>Check balances]
        ALLOW[approve()<br/>Allowances]
    end
    
    SEND --> SO
    SEND --> WO  
    SEND --> UO
    BAL --> SO
    BAL --> WO
    BAL --> UO
    ALLOW --> SO
    ALLOW --> WO
    ALLOW --> UO
    
    style SO fill:#8b5cf6,stroke:#5b21b6,color:#fff
    style WO fill:#10b981,stroke:#059669,color:#fff
    style UO fill:#3b82f6,stroke:#1e40af,color:#fff
```

## Common Usage Patterns

### **Simple Deposit Flow**
```typescript
// 1. Approve tokens
await wlfi.approve(vault.address, amount);
await usd1.approve(vault.address, amount);

// 2. Deposit to vault
const tx = await vault.depositDual(
  wlfiAmount,
  usd1Amount, 
  userAddress
);

// 3. Get shares received
const shares = await vault.balanceOf(userAddress);
```

### **Cross-Chain Transfer**
```typescript
// 1. Estimate fees
const fee = await shareOFT.quoteSend(
  destChainId,
  userAddress,
  amount,
  options
);

// 2. Send cross-chain
const tx = await shareOFT.send(
  destChainId,
  userAddress,
  amount,
  options,
  { value: fee.nativeFee }
);

// 3. Monitor status
const status = await getMessageStatus(tx.hash);
```

### **Vault Management**
```typescript
// 1. Check rebalance need
const shouldRebalance = await vault.shouldRebalance();

// 2. Execute rebalance
if (shouldRebalance) {
  await vault.connect(manager).rebalance();
}

// 3. Monitor performance  
const performance = await vault.getVaultPerformance();
```

## Development Tools

### **Hardhat Task Categories**

| Category | Tasks | Purpose |
|----------|-------|---------|
| **Deployment** | `deploy:eagle-ovault` | Deploy complete system |
| **Configuration** | `config:trusted-remotes` | Setup cross-chain connections |
| **Testing** | `test:cross-chain` | Validate omnichain flows |
| **Monitoring** | `monitor:vault` | Real-time system status |
| **Operations** | `ovault:rebalance` | Manage vault operations |

### **Environment Setup**
```bash
# Required environment variables
PRIVATE_KEY=0x...           # Deployment private key
ETHEREUM_RPC=https://...    # Ethereum RPC URL
BSC_RPC=https://...         # BSC RPC URL
ARBITRUM_RPC=https://...    # Arbitrum RPC URL
BASE_RPC=https://...        # Base RPC URL
AVALANCHE_RPC=https://...   # Avalanche RPC URL

# Optional API keys
ETHERSCAN_API_KEY=...       # Contract verification
BSCSCAN_API_KEY=...         # Contract verification  
ARBISCAN_API_KEY=...        # Contract verification
```

## Response Formats

### **Standard Transaction Response**
```typescript
interface TransactionResponse {
  hash: string;           // Transaction hash
  blockNumber: number;    // Block number
  gasUsed: BigNumber;     // Gas consumed
  events: Event[];        // Emitted events
  success: boolean;       // Transaction success
}
```

### **Vault Status Response**
```typescript
interface VaultStatus {
  totalAssets: BigNumber;     // Total managed assets
  totalSupply: BigNumber;     // Total shares outstanding  
  sharePrice: BigNumber;      // Price per share
  apy: number;               // Current APY
  liquidity: BigNumber;      // Uniswap V3 liquidity
  position: {                // Current LP position
    tickLower: number;
    tickUpper: number;
    amount0: BigNumber;
    amount1: BigNumber;
  };
}
```

### **Cross-Chain Message Status**
```typescript
interface MessageStatus {
  status: 'PENDING' | 'DELIVERED' | 'FAILED';
  srcTxHash: string;        // Source transaction hash
  dstTxHash?: string;       // Destination transaction hash
  retryCount: number;       // Retry attempts
  estimatedDelivery: Date;  // Expected delivery time
}
```

## 🔒 **Security Considerations**

### **Access Control**
- **Owner Functions**: Restricted to contract owner
- **Manager Functions**: Available to authorized managers
- **User Functions**: Public but with proper validation
- **Emergency Functions**: Owner-only with pause requirements

### **Input Validation**
```typescript
// All API calls should validate:
- Non-zero addresses
- Positive amounts
- Sufficient balances
- Proper allowances
- Valid chain IDs
- Authorized callers
```

### **Error Handling**
```typescript
// Common error types:
try {
  await vault.deposit(amount, recipient);
} catch (error) {
  if (error.reason === 'Insufficient balance') {
    // Handle insufficient balance
  } else if (error.reason === 'Vault paused') {
    // Handle paused state
  } else {
    // Handle other errors
  }
}
```

## Getting Started

### **1. Choose Your Integration**
- **Frontend dApp**: Use vault operations APIs
- **Cross-chain Service**: Implement LayerZero messaging
- **Management Tool**: Utilize Hardhat tasks
- **Analytics Platform**: Query view functions

### **2. Setup Development Environment**
```bash
# Clone the repository
git clone https://github.com/47-Eagle/eagle-ovault-clean
cd eagle-ovault-clean

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings
```

### **3. Explore Specific APIs**
- **[Vault Operations](./vault-operations)** - Core vault functionality
- **[Cross-Chain APIs](./cross-chain)** - LayerZero integration
- **[Hardhat Tasks](./hardhat-tasks)** - Development tools

### **4. Test Integration**
```bash
# Run local tests
npm test

# Test on testnets
npx hardhat test:cross-chain --network goerli
npx hardhat test:cross-chain --network bsc-testnet
```

## Additional Resources

- **[Architecture Guide](../dev/architecture)** - System design overview
- **[Security Documentation](../dev/security)** - Security best practices  
- **[Deployment Guide](../dev/deployment)** - Production deployment
- **[Troubleshooting](../advanced/troubleshooting)** - Common issues and solutions

---

**Ready to integrate with Eagle Omnichain Vault? Start with the specific API documentation that matches your use case!**

