# Eagle Omnichain Vault - Smart Contracts

This directory contains the source code for the Eagle Omnichain Vault smart contracts.

## Directory Structure

```
contracts/
├── core/                      # Core vault contracts
│   ├── EagleOVault.sol       # Main vault contract (ERC4626)
│   ├── EagleComposer.sol     # Cross-chain orchestration
│   └── CharmAlphaVaultStrategy.sol  # Charm Finance integration
├── interfaces/               # Contract interfaces
│   ├── IEagleOVault.sol     # Vault interface
│   └── ICharmAlphaVault.sol # Charm Finance interface
├── libraries/               # Utility libraries
│   ├── PriceValidation.sol  # TWAP price validation
│   └── ShareCalculation.sol # Share math utilities
└── test/                    # Test contracts and mocks
    ├── MockERC20.sol        # Test token
    └── MockUniswapV3Pool.sol # Test pool
```

## Import Instructions

To import the source contracts from the v1 repository:

1. **Clone the v1 repository locally:**
   ```bash
   git clone https://github.com/47-Eagle/v1.git
   cd v1/contracts
   ```

2. **Copy contracts to this documentation:**
   ```bash
   # From your v1 repo directory
   cp -r contracts/* /path/to/eagle-docs-clean/contracts/
   ```

3. **Update documentation to reference actual source code**

## Validation

After importing contracts, run validation:

```bash
# Install Solidity compiler
npm install -g solc

# Validate syntax
find contracts/ -name "*.sol" -exec solc --bin {} \;
```

## Integration with Documentation

The documentation in `docs/contracts/` will automatically reference these source files for:
- Accurate code examples
- ABI generation  
- Interface documentation
- Security audit trails
