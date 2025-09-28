---
id: index
title: Introduction to Eagle Vault
sidebar_label: Introduction
slug: /
---

# Introduction to Eagle Vault

## Omnichain DeFi Infrastructure

Eagle Vault is the next-generation omnichain DeFi protocol for institutional-grade yield strategies. Built on LayerZero's official OVault standard, Eagle enables seamless cross-chain operations, dual-token liquidity provision, and enterprise security across 5 major blockchains.

Unlike traditional single-chain vaults, Eagle provides truly omnichain experiences that are:

- **Standards-Compliant** – Built on LayerZero OVault and ERC4626 standards
- **Enterprise-Ready** – Production-grade security with comprehensive access controls  
- **Gas-Optimized** – Efficient cross-chain messaging and batch operations

Our flagship protocol powers sophisticated dual-token Uniswap V3 strategies, giving institutions and advanced users the ability to maximize yield across the entire DeFi ecosystem.

## What makes Eagle Vault unique?

**True Omnichain Operations**  
Deposit on BSC, withdraw on Arbitrum. Eagle's LayerZero integration enables seamless cross-chain vault interactions.

**Dual-Token LP Strategy**  
Advanced Uniswap V3 liquidity provision with WLFI + USD1 pairs, maximizing capital efficiency and yield.

**Enterprise Security**  
Built-in reentrancy protection, slippage limits, TWAP validation, and role-based access control.

## What can you deploy?

| Contract                               | Purpose                                                      |
| -------------------------------------- | ------------------------------------------------------------ |
| 🏛️ EagleOVault (ERC4626)               | [Core vault managing dual-token LP strategy](./contracts/eagle-ovault) |
| 🔗 ShareOFTAdapter (LayerZero)        | [Cross-chain vault share lockbox](./dev/architecture)                        |
| 🎯 EagleComposer (LayerZero)          | [Omnichain operation orchestrator](./dev/architecture)                       |
| 💰 Asset OFTs (WLFI/USD1)             | [Cross-chain token bridges](./dev/architecture)                              |

## Start building on Eagle

- [Deploy your vault with our Quick Start guide](./dev/quick-start)
- [Explore the Architecture](./dev/architecture) | [API Reference](./api/overview) | [View on GitHub](https://github.com/47-Eagle/eagle-ovault-clean)

Built with LayerZero OVault Standard, Eagle Vault represents the evolution of omnichain DeFi infrastructure.

---

**What's Next**

- [Quick Start](./dev/quick-start)
- [Learn about the architecture](./dev/architecture)
