---
id: overview
title: Eagle Omnichain Vault
sidebar_label: Overview
slug: /dev/overview
---

# Eagle Omnichain Vault

**Seamless cross-chain DeFi powered by LayerZero V2**

Eagle OVault delivers institutional-grade yield optimization across multiple blockchains with automated Uniswap V3 strategies through Charm Finance Alpha Vaults.

---

## What Makes Eagle Different

```mermaid
graph LR
    A[Traditional<br/>Single-Chain<br/>Vaults] -->|Limited| B[Fragmented<br/>Liquidity]
    C[Eagle<br/>Omnichain<br/>Vault] -->|Unified| D[Cross-Chain<br/>Optimization]
    
    style A fill:#ef4444,stroke:#dc2626,color:#fff
    style B fill:#f87171,stroke:#ef4444,color:#fff
    style C fill:#f6d55c,stroke:#fbbf24,color:#1a1a1a
    style D fill:#eab308,stroke:#f59e0b,color:#1a1a1a
```

### Core Innovation
- **True Omnichain**: Native LayerZero V2 integration, not bridges
- **Automated Strategies**: Charm Finance Alpha Vaults for Uniswap V3
- **Deterministic Deployment**: Same addresses across all chains
- **ERC-4626 Standard**: Universal vault compatibility

---

## Choose Your Path

<div className="user-resources-grid">
  <div className="resource-card">
    <h3>Users</h3>
    <p>Access cross-chain yield optimization with institutional-grade security and automated strategies.</p>
    <a href="/user" className="resource-link">Explore User Docs →</a>
  </div>
  
  <div className="resource-card">
    <h3>Developers</h3>
    <p>Build with LayerZero V2, ERC-4626 vaults, and comprehensive smart contract integrations.</p>
    <a href="/dev" className="resource-link">Developer Docs →</a>
  </div>
  
  <div className="resource-card">
    <h3>Investors</h3>
    <p>Discover the opportunity in next-generation omnichain DeFi infrastructure and technology.</p>
    <a href="/investor" className="resource-link">Investor Relations →</a>
  </div>
  
  <div className="resource-card">
    <h3>Partners</h3>
    <p>Join our ecosystem of strategic partners building the future of cross-chain DeFi together.</p>
    <a href="/partner" className="resource-link">Partnership Hub →</a>
  </div>
</div>

---

## System Architecture

Our registry-based omnichain architecture enables seamless multi-chain operations:

```mermaid
graph TB
    subgraph Registry[" Eagle Registry"]
        REG[Chain Registry<br/>0x472...EA91E]
        FACTORY[CREATE2 Factory<br/>0x695...03eE]
    end
    
    subgraph Hub[" Ethereum Hub"]
        VAULT[Eagle OVault<br/>ERC-4626]
        ADAPTER[Share Adapter<br/>Lockbox]
        COMPOSER[OVault Composer<br/>Orchestrator]
    end
    
    subgraph Strategy[" Yield Strategy"]
        CHARM[Charm Finance<br/>Alpha Vaults]
        UNI[Uniswap V3<br/>WLFI/USD1]
    end
    
    subgraph Spokes[" Cross-Chain Networks"]
        BSC[BNB Chain<br/>Spoke Vault]
        ARB[Arbitrum<br/>Spoke Vault]
        BASE[Base<br/>Spoke Vault]
    end
    
    subgraph LZ["⛓ LayerZero V2"]
        MESSAGING[Omnichain<br/>Messaging]
    end
    
    REG --> VAULT
    FACTORY --> VAULT
    VAULT --> ADAPTER
    VAULT --> COMPOSER
    COMPOSER --> CHARM
    CHARM --> UNI
    
    ADAPTER -.->|Cross-Chain| MESSAGING
    MESSAGING -.->|Sync| BSC
    MESSAGING -.->|Sync| ARB
    MESSAGING -.->|Sync| BASE
    
    style REG fill:#f6d55c,stroke:#fbbf24,color:#1a1a1a,stroke-width:3px
    style VAULT fill:#fbbf24,stroke:#f59e0b,color:#1a1a1a,stroke-width:2px
    style CHARM fill:#eab308,stroke:#ca8a04,color:#1a1a1a
    style MESSAGING fill:#e1f5fe,stroke:#0288d1,color:#000
```

---

## How It Works

### For Users: Simple 3-Step Process

```mermaid
graph LR
    A[1⃣<br/>Connect<br/>Wallet] --> B[2⃣<br/>Deposit<br/>Assets]
    B --> C[3⃣<br/>Earn<br/>Yield]
    
    style A fill:#f6d55c,stroke:#fbbf24,color:#1a1a1a
    style B fill:#fbbf24,stroke:#f59e0b,color:#1a1a1a
    style C fill:#eab308,stroke:#ca8a04,color:#1a1a1a
```

1. **Connect**: Link your Web3 wallet to Eagle OVault
2. **Deposit**: Add WLFI/USD1 on any supported chain
3. **Earn**: Automated Charm Finance strategies optimize your yield

### Cross-Chain Flow

```mermaid
sequenceDiagram
    participant User
    participant Base as Base Network
    participant LZ as LayerZero V2
    participant ETH as Ethereum Hub
    participant Charm as Charm Finance
    
    User->>Base: Deposit Assets
    Base->>LZ: Send Cross-Chain
    LZ->>ETH: Receive & Vault
    ETH->>Charm: Deploy to Alpha Vault
    Charm-->>User: Earn Optimized Yield
    
    rect rgb(246, 213, 92, 0.1)
        Note over Base,Charm: Seamless Omnichain Operation
    end
```

---

## Current Deployment

### Live Infrastructure

| Component | Status | Address |
|-----------|--------|---------|
| **Eagle Registry** |  Live | `0x472656c76f45e8a8a63fffd32ab5888898eea91e` |
| **CREATE2 Factory** |  Live | `0x695d6B3628B4701E7eAfC0bc511CbAF23f6003eE` |
| **Ethereum Hub** |  In Progress | Target: `0x47...EA91E` |
| **Charm Integration** |  Active | WLFI/USD1 Strategies |

### Development Roadmap

```mermaid
gantt
    title Eagle OVault Development Timeline
    dateFormat YYYY-MM
    section Infrastructure
    Registry & Factory           :done, 2024-01, 2024-02
    Ethereum Hub                :active, 2024-02, 2024-03
    section Multi-Chain
    BNB Chain Spoke            :2024-03, 2024-04
    Arbitrum & Base            :2024-04, 2024-05
    section Strategies
    Charm Alpha Vaults         :done, 2024-01, 2024-03
    Advanced Strategies        :2024-05, 2024-06
```

---

## Why Eagle OVault

### Technical Excellence
- **LayerZero V2**: Battle-tested omnichain messaging
- **ERC-4626**: Industry-standard vault interface
- **Open Source**: Fully transparent and auditable code
- **Deterministic**: Consistent addresses across all chains

### Strategic Integration
- **Charm Finance**: Proven Uniswap V3 optimization
- **Automated Rebalancing**: AI-driven position management
- **Multi-Pool**: Risk-optimized diversification

### Security First
- **Registry-Based**: Centralized configuration management
- **No Arbitrary Minting**: Respects token economics
- **Audited Contracts**: Security-focused development
- **Multi-Signature**: Governance-controlled operations

---

## Get Started

### For Users
Start earning cross-chain yield with automated strategies  
→ **[User Quick Start Guide](/user/getting-started)**

### For Developers
Integrate Eagle OVault into your application  
→ **[Developer Quick Start](/dev/quick-start)**

### For Institutions
Explore partnerships and integration opportunities  
→ **[Contact Partnerships](/partner)**

---

## Community & Resources

- **GitHub**: [47-Eagle Organization](https://github.com/47-Eagle)
- **Documentation**: Comprehensive guides for all audiences
- **Open Source**: Transparent development and operations

---

*Building the future of omnichain DeFi with LayerZero V2 and Charm Finance. Experience seamless cross-chain yield optimization today.*