---
id: index
title: 47 Eagle Finance
sidebar_label: Overview
slug: /
---

# 47 Eagle Finance

**47 Eagle Finance** extends the ERC-4626 tokenized vault standard with LayerZero's omnichain messaging, enabling users to **deposit assets from any chain** and **receive yield-bearing vault shares on their preferred network** in a single transaction.

Our vault leverages **Charm Finance Alpha Vaults** to deliver **enhanced yield potential** through professional Uniswap V3 liquidity management in strategically selected market tiers.

## What Are Omnichain Vaults?

- **Beyond single-chain vaults:**  
  Traditional ERC-4626 vaults restrict users to depositing and withdrawing on a single blockchain. 47 Eagle removes this limitation by making vault shares **omnichain fungible tokens (OFTs)** that can move seamlessly between any LayerZero-connected chain.

- **Hub-and-spoke architecture:**  
  The vault itself lives on one "hub" chain, while users can interact with it from any "spoke" chain. This design maintains the security and simplicity of a single vault while providing universal access across the entire omnichain ecosystem.

## Mental Model: Two OFT Meshes + Vault

To understand 47 Eagle architecture, think of it as **two separate OFT meshes** (`asset` + `share`) connected by an ERC-4626 vault and composer contract on a hub chain:

- **Asset OFT Mesh**: Enables the vault's underlying assets (e.g., `WLFI`, `USD1`) to move across chains using standard OFT implementation
- **Share OFT Mesh**: Enables vault shares to move across chains, using OFTAdapter (lockbox model) on the hub chain and standard OFT elsewhere  
- **ERC-4626 Vault**: Lives on the hub chain, implements standard `deposit`/`redeem` operations
- **OVault Composer**: Orchestrates cross-chain vault operations by receiving assets or shares with special instructions and coordinating the vault interactions with OFT transfers

**Key insight**: Users never interact directly with the vault - they send assets or shares cross-chain to the composer with encoded instructions, and the composer handles all vault operations and transfers out to the target destination.

## Contract Architecture

| Contract | Purpose | Standard |
|----------|---------|----------|
| **EagleOVault** | Core vault managing dual-token LP strategy | <span class="badge badge--warning">ERC4626</span> |
| **CharmAlphaVaultStrategy** | Interfaces with Charm Finance Alpha Vaults (1% fee tier) | <span class="badge badge--danger">Strategy</span> |
| **ShareOFTAdapter** | Cross-chain vault share lockbox | <span class="badge badge--info">LayerZero</span> |
| **EagleComposer** | Omnichain operation orchestrator | <span class="badge badge--info">LayerZero</span> |
| **Asset OFTs** | Cross-chain token bridges (WLFI/USD1) | <span class="badge badge--success">OFT</span> |

## How Omnichain Vaults Work

1. **Asset deposit flow:**  
   When a user deposits `assets` from a source chain, the OVault system:
   - Transfers the `assets` to the hub chain via **LayerZero's OFT standard**
   - Executes the deposit workflow via **LayerZero's Composer standard** which:
     - Deposits `assets` into **Charm Finance Alpha Vaults** for professional liquidity management
     - Mints vault `shares` representing proportional ownership
     - Sends the `shares` to the user's desired destination chain address via the OFT standard

2. **Share redemption flow:**  
   When redeeming shares for underlying `assets`:
   - `shares` are sent from the user's current chain back to the hub
   - The vault redeems `shares` for the underlying `assets`
   - `assets` are then sent to the user's chosen destination chain address

3. **Automatic error recovery:**  
   If any step fails (due to slippage, gas issues, or configuration errors), the OVault Composer provides permissionless recovery mechanisms to refund or retry the operation, ensuring users never lose funds.

## Core Design Principles

- **Full ERC-4626 compatibility:**  
  47 Eagle maintains complete compatibility with the ERC-4626 standard. The vault contract itself is a standard implementation—the omnichain functionality is added through LayerZero's OFT and Composer patterns.

- **Deterministic pricing:**  
  Unlike AMM-based systems, ERC-4626 vaults use deterministic share pricing based on `totalAssets / totalSupply`. This eliminates the need for oracles and reduces cross-chain complexity.

- **Permissionless recovery:**  
  All error recovery functions are permissionless—anyone can trigger refunds or retries for failed operations. This ensures that users always have a path to recover their assets without relying on admin intervention.

- **Configurable security:**  
  Vault operators can configure their security settings, including DVN selection, executor parameters, and rate limits, to match their risk tolerance and use case requirements.

## Essential Resources

- [Quick Start Guide](./dev/quick-start) - Deploy in 10 minutes
- [Charm Finance Integration](./concepts/charm-finance-integration) - Professional liquidity management strategy
- [Architecture Deep Dive](./dev/architecture) - Understanding the system
- [API Reference](./api/overview) - Complete function documentation
- [View on GitHub](https://github.com/47-Eagle/eagle-ovault-clean) - Source code & examples

## Integration with LayerZero Standards

- **Built on OFT Standard:**  
  Both the asset and share tokens use LayerZero's OFT standard for cross-chain transfers, ensuring consistent supply accounting and seamless movement between chains.

- **Leverages Composer Pattern:**  
  The OVault Composer handles complex multi-step operations (receive assets → deposit → send shares) in a single atomic transaction with automatic error handling.

- **Protocol-level security:**  
  Inherits LayerZero's security model with configurable DVNs, executors, and rate limiting to protect cross-chain operations.

## What's Next

1. [Quick Start](./dev/quick-start) - Get hands-on immediately
2. [Architecture](./dev/architecture) - Understand the system design
3. [Smart Contracts](./contracts/eagle-ovault) - Dive into the implementation
