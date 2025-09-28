---
id: user-faq
title: User FAQ
sidebar_label: User FAQ
---

# User FAQ

Common questions about using 47 Eagle Finance's omnichain vault platform.

## Getting Started

### What is 47 Eagle Finance?

47 Eagle Finance is an omnichain DeFi vault that allows you to deposit assets from any supported blockchain and earn yield through sophisticated dual-token Uniswap V3 strategies. You can withdraw your funds and rewards on any supported network.

### Which blockchains are supported?

Currently supported networks:
- **Ethereum** (Main vault hub)
- **Arbitrum** (Layer 2)
- **Base** (Coinbase Layer 2)
- **BSC** (Binance Smart Chain)
- **Avalanche**

### What tokens can I deposit?

The main supported assets are:
- **WLFI** (World Liberty Financial Token)
- **USD1** (Stablecoin)

Additional tokens may be supported - check the app for the current list.

### Do I need to have tokens on a specific chain?

No! You can deposit tokens from any supported blockchain. The vault automatically handles cross-chain bridging through LayerZero.

## Using the Platform

### How do I deposit funds?

1. Connect your wallet to the 47 Eagle Finance app
2. Select the network where you have tokens
3. Choose your asset and deposit amount
4. Confirm the transaction
5. Receive vault shares representing your position

### Can I deposit from one chain and withdraw to another?

Yes! This is one of the key benefits. You can:
- Deposit WLFI on BSC
- Withdraw your funds + yield on Arbitrum
- All in separate transactions when convenient for you

### How long does it take for deposits to be processed?

- **Same-chain deposits**: 1-2 minutes
- **Cross-chain deposits**: 5-15 minutes depending on the source chain
- **Withdrawals**: 5-20 minutes depending on destination chain

### What are vault shares?

Vault shares are tokens you receive when you deposit. They represent your proportional ownership of the vault. As the vault generates yield, each share becomes worth more of the underlying assets.

## Yield and Performance

### How does the vault generate yield?

The vault uses a dual-token Uniswap V3 strategy:

1. **Liquidity Provision**: Your assets provide liquidity to WLFI/USD1 trading pairs
2. **Fee Collection**: Earns fees from every trade in the pool
3. **Active Management**: Algorithmic optimization of liquidity positions
4. **Compound Returns**: All fees are automatically reinvested

### What returns can I expect?

Returns vary based on:
- Trading volume in WLFI/USD1 pairs
- Market volatility (more volatility = more trading = more fees)
- Overall liquidity in the pool
- Strategy performance

Historical performance and current APY are displayed in the app dashboard.

### Are returns guaranteed?

No. Like all DeFi investments, returns depend on market conditions and strategy performance. The vault can experience losses during extreme market movements.

### How often are yields distributed?

Yields are automatically compounded continuously. Your vault shares increase in value in real-time as the vault earns fees.

## Fees and Costs

### What fees does 47 Eagle Finance charge?

- **Management Fee**: Small annual fee on assets under management
- **Performance Fee**: Percentage of generated yield
- **Gas Fees**: Network transaction costs (paid to the blockchain)

Specific rates are displayed in the app before you confirm transactions.

### Are there any cross-chain bridge fees?

No additional bridge fees! The vault covers LayerZero messaging costs. You only pay standard gas fees on your origin and destination chains.

### How do I minimize transaction costs?

- **Deposit larger amounts** to spread gas costs over more capital
- **Use lower-cost networks** like Arbitrum or Base
- **Time transactions** during low network congestion
- **Batch operations** when possible

## Security and Safety

### Is my money safe?

47 Eagle Finance uses institutional-grade security:

- **Audited smart contracts** built on proven standards
- **LayerZero integration** - battle-tested cross-chain protocol
- **Automated recovery** mechanisms for failed transactions
- **No admin keys** - fully decentralized operations

### What happens if a cross-chain transaction fails?

The vault includes automatic recovery mechanisms:
- Failed transactions are automatically detected
- Refunds are processed without manual intervention
- Anyone can trigger the recovery process (permissionless)
- Your funds are never permanently stuck

### Can the team steal my funds?

No. The vault is designed to be fully decentralized:
- No admin keys that can access user funds
- All operations are governed by smart contract logic
- Emergency functions only pause deposits, never access funds
- Withdrawals are always available to users

### What if there's a hack or exploit?

Multiple layers of protection:
- Code audits by reputable security firms
- Built on battle-tested protocols (LayerZero, ERC-4626, Uniswap V3)
- Gradual launch with small initial limits
- Insurance fund considerations for the future

## Technical Questions

### What is LayerZero and why do you use it?

LayerZero is a cross-chain protocol that enables secure messaging between blockchains. We use it because:
- **Security**: Battle-tested with $20B+ in cross-chain volume
- **Reliability**: High uptime and successful message delivery
- **Standards**: Official OVault standard for omnichain vaults
- **Future-proof**: Expanding to new chains as they're added to LayerZero

### What's the difference between this and other yield farms?

Key differences:
- **Truly omnichain**: Deposit/withdraw from any supported chain
- **Unified liquidity**: All deposits work together vs. fragmented pools
- **Professional strategies**: Algorithmic Uniswap V3 management
- **No lock-ups**: Withdraw anytime to any supported chain
- **Institutional-grade**: Built for serious DeFi users and institutions

### Can I use vault shares as collateral?

Yes! Vault shares are standard ERC-20 tokens on each chain, so they can be:
- Used as collateral in lending protocols
- Traded on DEXs
- Transferred to other wallets
- Integrated into other DeFi strategies

## Troubleshooting

### My transaction is stuck - what do I do?

1. **Check transaction status** in the app dashboard
2. **Wait for confirmation** - cross-chain transactions take time
3. **Check LayerZero scan** for cross-chain message status
4. **Contact support** if stuck for more than 30 minutes

### I can't see my deposit/shares

1. **Check the correct network** in your wallet
2. **Add the token contract** if shares don't appear automatically
3. **Wait for cross-chain confirmation** (up to 15 minutes)
4. **Refresh the app** to update balances

### Gas fees are too high

Try these alternatives:
- **Use Arbitrum or Base** for lower gas costs
- **Wait for lower congestion** (weekends, off-hours)
- **Deposit larger amounts** to amortize gas costs
- **Check gas trackers** for optimal timing

## Getting Help

### Where can I get support?

- **Discord Community**: Join our Discord for real-time help
- **GitHub Issues**: Report technical problems
- **Documentation**: Comprehensive guides and tutorials
- **Email Support**: For urgent issues

### How do I report a bug?

1. **Gather details**: Transaction hashes, error messages, screenshots
2. **Check known issues** in our GitHub repository
3. **Submit a bug report** with full details
4. **Join Discord** for immediate assistance if urgent

### Where can I track development updates?

- **GitHub Repository**: Latest code changes and releases
- **Discord Announcements**: Major updates and features
- **Documentation**: Updated guides and features
- **Social Media**: Follow for ecosystem updates

## Advanced Usage

### Can institutions use this platform?

Yes! 47 Eagle Finance is designed for institutional use:
- **Professional-grade strategies** comparable to traditional finance
- **Institutional security standards** with audited smart contracts
- **Large capacity** - can handle significant deposit volumes
- **Compliance considerations** - built with regulatory awareness
- **API access** for institutional portfolio management

### How do I integrate vault shares into my DeFi strategy?

Vault shares are composable DeFi primitives:
- **Collateral**: Use in lending protocols like Aave or Compound
- **Trading**: Swap on DEXs for other assets
- **Derivatives**: Create options or futures on vault performance
- **Yield Stacking**: Use as collateral to borrow and re-invest

### Can I build on top of 47 Eagle Finance?

Absolutely! The platform is designed for composability:
- **Open source contracts** - fork and modify
- **Standard interfaces** - ERC-4626 and LayerZero OFT compatibility
- **API access** - programmatic interaction
- **Developer documentation** - comprehensive integration guides
