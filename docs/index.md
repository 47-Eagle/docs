---
id: index
title: Introduction to Eagle Vault
sidebar_label: Welcome
slug: /
---

# Introduction to Eagle Vault

## Next-Generation Omnichain DeFi Infrastructure

Eagle Vault is the next-generation omnichain DeFi protocol for institutional-grade yield strategies. Built on LayerZero's official OVault standard, Eagle enables seamless cross-chain operations, dual-token liquidity provision, and enterprise security across 5 major blockchains.

Unlike traditional single-chain vaults, Eagle provides truly omnichain experiences that are:

- **Standards-Compliant** – Built on LayerZero OVault and ERC4626 standards
- **Enterprise-Ready** – Production-grade security with comprehensive access controls  
- **Gas-Optimized** – Efficient cross-chain messaging and batch operations

Our flagship protocol powers sophisticated dual-token Uniswap V3 strategies, giving institutions and advanced users the ability to maximize yield across the entire DeFi ecosystem.

## What makes Eagle Vault unique?

### **True Omnichain Operations**  
Deposit on BSC, withdraw on Arbitrum. Eagle's LayerZero integration enables seamless cross-chain vault interactions with institutional-grade reliability.

### **Dual-Token LP Strategy**  
Advanced Uniswap V3 liquidity provision with WLFI + USD1 pairs, maximizing capital efficiency and yield through sophisticated algorithmic strategies.

### **Enterprise Security**  
Built-in reentrancy protection, slippage limits, TWAP validation, and role-based access control. Audited and battle-tested for institutional use.

## What can you deploy?

<div class="animate-fade-in-up">

| Contract | Purpose | Standard |
|----------|---------|----------|
| **EagleOVault** (ERC4626) | [Core vault managing dual-token LP strategy](./contracts/eagle-ovault) | <span class="badge badge--warning">ERC4626</span> |
| **ShareOFTAdapter** (LayerZero) | [Cross-chain vault share lockbox](./dev/architecture) | <span class="badge badge--info">LayerZero</span> |
| **EagleComposer** (LayerZero) | [Omnichain operation orchestrator](./dev/architecture) | <span class="badge badge--info">LayerZero</span> |
| **Asset OFTs** (WLFI/USD1) | [Cross-chain token bridges](./dev/architecture) | <span class="badge badge--success">OFT</span> |

</div>

## Start building on Eagle

<div class="animate-fade-in-up">

:::tip **Ready to Deploy?**
Get your Eagle Vault running in minutes with our comprehensive guides and battle-tested templates.
:::

### **Essential Resources**

- **[Quick Start Guide](./dev/quick-start)** - Deploy in 10 minutes
- **[Architecture Deep Dive](./dev/architecture)** - Understanding the system
- **[API Reference](./api/overview)** - Complete function documentation  
- **[View on GitHub](https://github.com/47-Eagle/eagle-ovault-clean)** - Source code & examples

</div>

---

<div class="text-center">

**Built with LayerZero OVault Standard**  
*Eagle Vault represents the evolution of omnichain DeFi infrastructure*

</div>

### **What's Next**

<div class="animate-fade-in-up">

1. **[Quick Start](./dev/quick-start)** - Get hands-on immediately
2. **[Architecture](./dev/architecture)** - Understand the elegance
3. **[Smart Contracts](./contracts/eagle-ovault)** - Dive into the code

</div>
