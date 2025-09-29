---
id: withdrawals-and-liquidity
title: Withdrawals and Liquidity
sidebar_label: Withdrawals and Liquidity
---

# Withdrawals and Liquidity

Understanding how large withdrawals work in 47 Eagle Finance, including the automated processing of significant vault share redemptions.

## Executive Summary

The EagleOVault handles large withdrawals, including 50% or more of total vault shares, completely automatically with no manual intervention required. The process typically takes 2-10 minutes and includes built-in slippage protection, proportional strategy unwinding, and fair pricing mechanisms.

## Automated Withdrawal Process

The vault processes all withdrawals through a standardized five-phase approach:

| Phase | Process | Timeline | Manual Intervention |
|-------|---------|----------|-------------------|
| **Share Validation** | Verify user ownership and calculate entitlement | Instant | None required |
| **Direct Balance Withdrawal** | Fulfill from vault's immediate holdings | Instant | None required |
| **Strategy Unwinding** | Liquidate from strategies proportionally | 2-10 minutes | None required |
| **Slippage Protection** | Apply maximum slippage limits (5%) | Automatic | None required |
| **Final Transfer** | Send assets to user wallet | Instant | None required |

## Technical Processing Flow

### Step 1: Asset Calculation

The vault calculates the exact amount owed to the withdrawing user:

```solidity
uint256 totalWithdrawValue = (totalAssets() * shares) / totalShares;
// Example: (15,000 tokens * 500,000 shares) / 1,000,000 shares = 7,500 tokens owed
```

### Step 2: Direct Balance Fulfillment

Immediate withdrawal from the vault's direct token holdings:

```solidity
// Proportional fulfillment from vault's immediate balances
uint256 wlfiFromBalance = (wlfiBalance * shares) / totalShares;
uint256 usd1FromBalance = (usd1Balance * shares) / totalShares;
```

### Step 3: Strategy Liquidation

If additional assets are needed, automatic strategy unwinding occurs:

```solidity
uint256 remainingValue = totalWithdrawValue - directFulfillment;
if (remainingValue > 0) {
    _withdrawFromStrategiesPro(remainingValue); // Automatic unwinding
}
```

## Asset Unwinding Priority

### Phase 1: Direct Holdings (Instant)

| Asset Pool | Typical Allocation | Withdrawal Speed | Associated Risk |
|------------|-------------------|------------------|-----------------|
| Direct WLFI Balance | 10-30% | Instant | None |
| Direct USD1 Balance | 10-30% | Instant | None |
| **Total Immediate Fulfillment** | **20-60%** | **0 seconds** | **No slippage risk** |

### Phase 2: Strategy Unwinding (2-10 minutes)

| Strategy Type | Typical Holdings | Unwinding Process | Time Required |
|---------------|------------------|-------------------|---------------|
| **Charm Finance Alpha Vaults** | 40-80% | Uniswap V3 LP position liquidation | 3-5 minutes |
| **Future Strategies** | Variable | Strategy-specific liquidation | 1-5 minutes |
| **Parallel Processing** | All strategies | Simultaneous unwinding | 5-10 minutes maximum |

## Real-World Example: 50% Vault Withdrawal

### Initial Vault State

Consider a hypothetical scenario where a user holds 50% of all vault shares:

```
EAGLE VAULT STATUS
==================
Total Shares: 1,000 EAGLE
Total Assets: 15,000 tokens  
Share Price: 15.0 tokens per EAGLE

Asset Allocation:
├─ Direct Holdings: 3,000 tokens (20%)
│  ├─ WLFI: 2,000 tokens
│  └─ USD1: 1,000 tokens
└─ Strategy Positions: 12,000 tokens (80%)
   ├─ Charm Alpha Vault: 10,000 tokens
   └─ Future Strategy: 2,000 tokens

User Position: 500 EAGLE shares (50% of vault)
Withdrawal Entitlement: 7,500 tokens
```

### Withdrawal Execution Process

```
PROCESSING 50% WITHDRAWAL
=========================
Target Withdrawal: 7,500 tokens

Phase 1 - Direct Balance (Instant):
├─ WLFI withdrawn: 1,000 tokens
├─ USD1 withdrawn: 500 tokens  
└─ Immediate fulfillment: 1,500 tokens (20% complete)

Phase 2 - Strategy Unwinding (5-8 minutes):
├─ Charm Alpha liquidation: 6,000 tokens
├─ Market slippage: -120 tokens (-2%)
└─ Net strategy withdrawal: 5,880 tokens

Final Settlement:
├─ Total received: 1,500 + 5,880 = 7,380 tokens
├─ Total slippage cost: 120 tokens (-1.6%)
└─ Processing time: 6 minutes
```

### Post-Withdrawal Vault State

```
VAULT STATE AFTER WITHDRAWAL
=============================
Total Shares: 500 EAGLE (-50%)
Total Assets: 7,620 tokens (-49.2%)
New Share Price: 15.24 tokens per EAGLE (+1.6%)

Benefits for Remaining Holders:
├─ Share price appreciation (slippage absorbed by withdrawer)
├─ Automatic vault rebalancing
└─ Reduced concentration risk
```

## Processing Times by Vault Size

| Vault TVL | Direct Holdings % | Strategy Holdings % | 50% Withdrawal Time | Expected Slippage |
|-----------|-------------------|-------------------|-------------------|------------------|
| **$1M** | 80% | 20% | 30 seconds | 0.1% |
| **$10M** | 60% | 40% | 2-3 minutes | 0.5-1% |
| **$100M** | 40% | 60% | 5-8 minutes | 1-2% |
| **$1B** | 20% | 80% | 10-15 minutes | 2-5% |

## Built-in Protection Mechanisms

### Slippage Protection

The vault implements maximum slippage limits to protect users:

```solidity
uint256 maxSlippage = 500; // 5% maximum acceptable loss
uint256 amount0Min = (expectedAmount0 * (10000 - maxSlippage)) / 10000;
```

### Proportional Strategy Unwinding

Each strategy contributes proportionally to avoid creating imbalances:

```solidity
// Each strategy contributes based on its weight in the total portfolio
uint256 withdrawValue = (valueNeeded * strategyWeights[strategy]) / totalStrategyWeight;
```

### Emergency Controls

Administrative safeguards protect the system during extreme conditions:

```solidity
bool public paused = false; // Emergency withdrawal halt capability
modifier nonReentrant // Prevents exploit attacks during processing
```

## Withdrawal Scenarios

### Optimal Scenario: High Direct Liquidity

- **Direct Holdings**: 60%+ of vault assets
- **Processing Result**: Instant withdrawal with zero slippage
- **Time Required**: Less than 30 seconds
- **Associated Costs**: Only network gas fees ($2-5)

### Typical Scenario: Strategy Unwinding Required

- **Direct Holdings**: 20-40% of vault assets
- **Processing Result**: 2-10 minute processing with 1-3% slippage
- **Time Required**: 2-10 minutes
- **Associated Costs**: $50-500 in slippage plus gas fees

### Challenging Scenario: Limited Direct Liquidity

- **Direct Holdings**: Less than 10% of vault assets
- **Processing Result**: Extended processing with higher slippage
- **Time Required**: 15-30 minutes
- **Associated Costs**: 3-10% slippage
- **System Response**: Emergency rebalancing protocols may activate

## User Experience

### Single Transaction Process

Users initiate withdrawals with one simple function call:

```solidity
// User initiates withdrawal with single transaction:
vault.withdrawDual(500_000_shares, user_address);

// Automated processing includes:
// - Direct balance withdrawal (instant)
// - Strategy position unwinding (automated)
// - Slippage protection application (built-in)
// - Final token transfer (instant)
```

### Automated Processing Benefits

- **Set and Forget**: One transaction initiates complete automatic processing
- **Real-time Monitoring**: Events emitted throughout process for tracking
- **Fair Pricing**: Share price may increase due to slippage absorption by withdrawer
- **Robust Design**: System functions reliably even during market stress conditions

## Key Considerations

| System Strengths | Important Considerations |
|------------------|-------------------------|
| Fully automated processing | Large withdrawals require 2-10 minutes |
| No manual intervention needed | Strategy unwinding incurs 1-5% slippage |
| Built-in slippage protection | Processing time scales with withdrawal size |
| Proportional strategy unwinding | Gas costs increase with system complexity |
| Maintains overall vault health | Withdrawer absorbs market impact costs |

## System Capabilities

The EagleOVault can process even massive withdrawals (50%+ of total shares) through its automated infrastructure. The system:

1. **Instantly** fulfills withdrawals from direct vault balances
2. **Automatically** unwinds strategy positions as needed
3. **Protects** users against excessive slippage through built-in limits
4. **Transfers** final tokens to user wallets upon completion

This represents robust, automated DeFi infrastructure designed to scale gracefully under significant withdrawal pressure while maintaining system stability and user protection.

## Technical Implementation

The withdrawal system leverages multiple sophisticated mechanisms:

- **Proportional Allocation**: Each strategy contributes fairly to withdrawal fulfillment
- **Slippage Mitigation**: Maximum acceptable loss limits protect users
- **Parallel Processing**: Multiple strategies unwind simultaneously for efficiency
- **Emergency Safeguards**: Administrative controls available for extreme scenarios
- **Fair Pricing**: Remaining vault holders benefit from withdrawal-related slippage

This implementation ensures reliable liquidity provision while maintaining the stability and efficiency of the overall vault ecosystem.
