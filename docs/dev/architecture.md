---
id: architecture
title: System Architecture
sidebar_label: Architecture
---

# Eagle Vault System Architecture

**Registry-based omnichain infrastructure powered by LayerZero V2**

A comprehensive technical overview of the Eagle Omnichain Vault architecture, implementing the LayerZero OVault pattern with deterministic cross-chain deployment.

---

## Architecture Overview

```mermaid
graph TB
    subgraph Foundation[" Foundation Layer"]
        REG[Eagle Registry<br/>0x472...EA91E]
        CREATE2[CREATE2 Factory<br/>0x695...03eE]
    end
    
    subgraph Hub[" Ethereum Hub Chain"]
        VAULT[Eagle OVault<br/><i>ERC-4626 Vault</i>]
        SHARE_ADAPTER[Share OFT Adapter<br/><i>Lockbox</i>]
        COMPOSER[OVault Composer<br/><i>Orchestrator</i>]
    end
    
    subgraph Spokes[" Spoke Chains"]
        SHARE_OFT[Share OFT<br/><i>Cross-Chain Shares</i>]
        ASSET_SPOKE[Asset OFT Spoke<br/><i>WLFI/USD1</i>]
    end
    
    subgraph Strategy[" Yield Strategy"]
        CHARM[Charm Finance<br/><i>Alpha Vaults</i>]
        UNI[Uniswap V3<br/><i>WLFI/USD1 Pools</i>]
    end
    
    subgraph LZ["⛓ LayerZero V2"]
        MESSAGING[Omnichain Messaging]
    end
    
    REG -->|Configures| VAULT
    REG -->|Configures| SHARE_OFT
    CREATE2 -->|Deploys| VAULT
    
    VAULT --> SHARE_ADAPTER
    VAULT --> COMPOSER
    VAULT --> CHARM
    CHARM --> UNI
    
    SHARE_ADAPTER <-.->|Cross-Chain| MESSAGING
    MESSAGING <-.->|Sync| SHARE_OFT
    MESSAGING <-.->|Sync| ASSET_SPOKE
    
    style REG fill:#f6d55c,stroke:#fbbf24,color:#1a1a1a,stroke-width:3px
    style CREATE2 fill:#f6d55c,stroke:#fbbf24,color:#1a1a1a,stroke-width:3px
    style VAULT fill:#fbbf24,stroke:#f59e0b,color:#1a1a1a,stroke-width:2px
    style CHARM fill:#eab308,stroke:#ca8a04,color:#1a1a1a
    style MESSAGING fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,color:#000
    style SHARE_ADAPTER fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style COMPOSER fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    style SHARE_OFT fill:#8b5cf6,stroke:#5b21b6,stroke-width:2px,color:#fff
    style ASSET_SPOKE fill:#eab308,stroke:#ca8a04,color:#1a1a1a
    style UNI fill:#10b981,stroke:#059669,color:#fff
```

---

## Core Principles

### 1. Registry-First Design

The Eagle Registry serves as the central configuration hub for the entire omnichain system.

```mermaid
graph LR
    A[Eagle Registry] --> B[LayerZero<br/>Endpoints]
    A --> C[Chain<br/>Configuration]
    A --> D[Contract<br/>Addresses]
    
    B --> E[Deterministic<br/>Deployment]
    C --> E
    D --> E
    
    style A fill:#f6d55c,stroke:#fbbf24,color:#1a1a1a,stroke-width:3px
    style E fill:#eab308,stroke:#ca8a04,stroke-width:2px,color:#1a1a1a
    style B fill:#fbbf24,stroke:#f59e0b,stroke-width:2px,color:#1a1a1a
    style C fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style D fill:#10b981,stroke:#059669,color:#fff
```

**Benefits:**
- Single source of truth for all chain configurations
- Easy endpoint updates without contract redeployment
- Deterministic addresses across all chains
- Simplified multi-chain management

### 2. No Arbitrary Minting

Security-first approach to token economics:

```mermaid
graph TB
    subgraph Existing["Where Token Exists"]
        TOKEN[WLFI Token]
        ADAPTER[WLFI Adapter<br/>Wraps Only]
    end
    
    subgraph New["Where Token Needed"]
        OFT[WLFI OFT<br/>Controlled Mint/Burn]
    end
    
    TOKEN -->|Lock| ADAPTER
    ADAPTER -.->|LZ Message| OFT
    OFT -.->|Burn & Send| ADAPTER
    
    style ADAPTER fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
    style OFT fill:#f6d55c,stroke:#fbbf24,stroke-width:3px,color:#1a1a1a
    style TOKEN fill:#fbbf24,stroke:#f59e0b,stroke-width:2px,color:#1a1a1a
```

**Security Model:**
- **Adapters**: Lock/unlock existing tokens (Ethereum, BNB Chain)
- **OFTs**: Mint/burn only when cross-chain transfer occurs
- **Total Supply**: Constant across all chains combined

---

## Deployed Infrastructure

| Contract | Address | Status |
|----------|---------|--------|
| **Eagle Registry** | `0x472656c76f45e8a8a63fffd32ab5888898eea91e` |  Live |
| **CREATE2 Factory** | `0x695d6B3628B4701E7eAfC0bc511CbAF23f6003eE` |  Live |
| **Ethereum Hub** | `0x47...EA91E` (Target) |  In Progress |

---

## Cross-Chain Workflows

### Deposit Flow

```mermaid
sequenceDiagram
    actor User
    participant Spoke as Spoke Chain
    participant LZ as LayerZero V2
    participant Hub as Ethereum Hub
    participant Charm as Charm Finance
    
    rect rgb(246, 213, 92, 0.15)
        Note over User,Charm: Deposit 1000 WLFI from Spoke
    end
    
    User->>Spoke: Deposit 1000 WLFI
    Spoke->>LZ: Send Cross-Chain
    LZ->>Hub: Receive Assets
    Hub->>Charm: Deploy to Alpha Vault
    Charm-->>Hub: Return Shares
    Hub->>LZ: Send Shares
    LZ->>Spoke: Deliver Shares
    Spoke->>User: Receive 950 Shares
    
    rect rgb(234, 179, 8, 0.15)
        Note over User,Charm: Earning yield automatically
    end
```

### Withdrawal Flow

```mermaid
sequenceDiagram
    actor User
    participant Spoke as Spoke Chain
    participant LZ as LayerZero V2
    participant Hub as Ethereum Hub
    participant Charm as Charm Finance
    
    rect rgb(246, 213, 92, 0.15)
        Note over User,Charm: Withdraw 500 Shares
    end
    
    User->>Spoke: Burn 500 Shares
    Spoke->>LZ: Send Cross-Chain
    LZ->>Hub: Receive Burn Request
    Hub->>Charm: Withdraw from Alpha Vault
    Charm-->>Hub: Return 520 WLFI (with yield)
    Hub->>LZ: Send Assets
    LZ->>Spoke: Deliver Assets
    Spoke->>User: Receive 520 WLFI
    
    rect rgb(234, 179, 8, 0.15)
        Note over User,Charm: Yield included: +20 WLFI
    end
```

---

## Contract Architecture

### Adapters (Existing Tokens)

```solidity
// Wraps existing WLFI for cross-chain transfers
contract WLFIAdapter is OFTAdapter {
    constructor(
        address _token,      // Existing WLFI
        address _lzEndpoint, // LayerZero
        address _delegate    // Owner
    ) OFTAdapter(_token, _lzEndpoint, _delegate) {}
    
    // Only locks/unlocks - no minting
}
```

### OFTs (New Chains)

```solidity
// Native omnichain vault shares
contract EagleShareOFT is OFT {
    IChainRegistry public immutable registry;
    
    constructor(address _registry) {
        registry = IChainRegistry(_registry);
    }
    
    // Mints when receiving cross-chain
    // Burns when sending back
}
```

### Composers (Orchestration)

```solidity
// Multi-step cross-chain operations
contract EagleOVaultComposer {
    function composeDeposit(
        uint32 _dstEid,
        uint256 _amount,
        address _recipient
    ) external payable {
        // 1. Receive assets
        // 2. Vault deposit  
        // 3. Cross-chain shares
    }
}
```

---

## Charm Finance Integration

```mermaid
graph TB
    subgraph Vault["Eagle OVault"]
        ASSETS[User Assets]
    end
    
    subgraph Charm["Charm Alpha Vaults"]
        ALPHA[Strategy Manager]
        POS1[1.00% Pool]
        POS2[0.30% Pool]
    end
    
    subgraph Uniswap["Uniswap V3"]
        POOL1[High Fee Pool<br/>$5K TVL]
        POOL2[High Volume Pool<br/>$11.7M TVL]
    end
    
    ASSETS -->|Deploy| ALPHA
    ALPHA -->|Optimize| POS1
    ALPHA -->|Optimize| POS2
    POS1 <-->|Liquidity| POOL1
    POS2 <-->|Liquidity| POOL2
    
    POOL1 -.->|Fees| ALPHA
    POOL2 -.->|Fees| ALPHA
    ALPHA -.->|Yield| ASSETS
    
    style ASSETS fill:#fbbf24,stroke:#f59e0b,stroke-width:3px,color:#1a1a1a
    style ALPHA fill:#eab308,stroke:#ca8a04,stroke-width:3px,color:#1a1a1a
    style POOL1 fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style POOL2 fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style POS1 fill:#8b5cf6,stroke:#5b21b6,color:#fff
    style POS2 fill:#8b5cf6,stroke:#5b21b6,color:#fff
```

### Active Strategy Pools

| Pool | Fee Tier | TVL | 24h Volume | Strategy |
|------|----------|-----|------------|----------|
| WLFI/USD1 | 1.00% | $5,348 | $767,477 | High fee capture |
| WLFI/USD1 | 0.30% | $11.7M | $399.8M | Volume efficiency |

---

## Security Model

```mermaid
graph TB
    A[Registry Control] --> B[Configuration<br/>Management]
    C[No Arbitrary Minting] --> D[Controlled<br/>Supply]
    E[Deterministic Deploy] --> F[Predictable<br/>Addresses]
    G[Multi-Signature] --> H[Governance<br/>Protection]
    
    B --> I[Secure System]
    D --> I
    F --> I
    H --> I
    
    style A fill:#f6d55c,stroke:#fbbf24,stroke-width:3px,color:#1a1a1a
    style C fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
    style E fill:#eab308,stroke:#ca8a04,stroke-width:3px,color:#1a1a1a
    style G fill:#ef4444,stroke:#dc2626,stroke-width:3px,color:#fff
    style I fill:#6366f1,stroke:#4f46e5,stroke-width:3px,color:#fff
    style B fill:#fbbf24,stroke:#f59e0b,color:#1a1a1a
    style D fill:#fbbf24,stroke:#f59e0b,color:#1a1a1a
    style F fill:#10b981,stroke:#059669,color:#fff
    style H fill:#ef4444,stroke:#dc2626,color:#fff
```

**Key Features:**
1. **Registry Control**: Centralized endpoint management
2. **No Arbitrary Minting**: Adapters wrap, OFTs mint only on transfer
3. **Deterministic Addresses**: CREATE2 for consistency
4. **Multi-Signature**: Consensus for critical operations

---

## Development Roadmap

```mermaid
gantt
    title Eagle OVault Development Timeline
    dateFormat YYYY-MM
    section Foundation
    Registry & Factory    :done, 2024-01, 2024-02
    Charm Integration    :done, 2024-01, 2024-03
    section Hub
    Ethereum Deployment  :active, 2024-02, 2024-03
    section Spokes
    BNB Chain           :2024-03, 2024-04
    Arbitrum & Base     :2024-04, 2024-05
    Avalanche           :2024-05, 2024-06
```

### Current Status

**Phase 1 - Foundation**  Completed
- Registry deployment
- CREATE2 factory
- Charm integration

**Phase 2 - Hub**  In Progress
- Ethereum vault
- Orchestration layer
- Security audits

**Phase 3 - Spokes**  Planned
- Multi-chain deployment
- Cross-chain testing
- Production launch

---

## Technical Resources

- **Registry**: `0x472656c76f45e8a8a63fffd32ab5888898eea91e`
- **Factory**: `0x695d6B3628B4701E7eAfC0bc511CbAF23f6003eE`
- **GitHub**: [47-Eagle Organization](https://github.com/47-Eagle)
- **LayerZero**: [V2 Documentation](https://docs.layerzero.network)
- **Charm**: [Alpha Vaults](https://alpha.charm.fi)

---

*Building secure, scalable omnichain infrastructure with LayerZero V2 and registry-based architecture.*
