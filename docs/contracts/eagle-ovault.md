---
id: eagle-ovault
title: EagleOVault Contract
sidebar_label: EagleOVault
---

# EagleOVault Contract

The **EagleOVault** is the core vault contract implementing ERC4626 with a sophisticated dual-token Uniswap V3 LP strategy.

## Contract Overview

```solidity
contract EagleOVault is ERC4626, Ownable, ReentrancyGuard, Pausable {
    // Core tokens
    IERC20 public immutable WLFI;
    IERC20 public immutable USD1;
    IUniswapV3Pool public immutable pool;
    
    // Strategy parameters
    uint256 public maxSlippage = 500; // 5%
    uint256 public rebalanceThreshold = 200; // 2%
    uint32 public twapPeriod = 3600; // 1 hour
    
    // Access control
    mapping(address => bool) public managers;
    mapping(address => bool) public authorizedUsers;
}
```

## Key Features

### **ERC4626 Compliance**
- **Standard Interface**: Full ERC4626 tokenized vault implementation
- **Asset Management**: Handles WLFI as primary asset with USD1 support
- **Share Accounting**: Proper share minting and burning mechanics
- **Preview Functions**: Accurate deposit/withdrawal previews

### **Dual-Token Strategy**
- **Balanced Approach**: Manages both WLFI and USD1 in optimal ratios
- **Uniswap V3 Integration**: Creates concentrated liquidity positions
- **Dynamic Rebalancing**: Adjusts positions based on market conditions
- **Fee Harvesting**: Automatically collects and reinvests trading fees

### **Security Features**
- **Reentrancy Protection**: NonReentrant modifiers on external functions
- **Input Validation**: Comprehensive parameter and state checks
- **Slippage Limits**: TWAP-based price validation with configurable limits
- **Emergency Controls**: Pause mechanism and emergency withdrawal functions

## Core Functions

### **Deposit Operations**

#### **`deposit(uint256 assets, address receiver)`**
```solidity
function deposit(uint256 assets, address receiver) 
    public 
    override 
    nonReentrant 
    whenNotPaused 
    returns (uint256 shares) 
{
    require(assets > 0, "Invalid amount");
    require(receiver != address(0), "Invalid receiver");
    
    // Calculate shares to mint
    shares = previewDeposit(assets);
    
    // Transfer assets from user
    WLFI.safeTransferFrom(msg.sender, address(this), assets);
    
    // Add to LP strategy
    _addLiquidity(assets);
    
    // Mint shares to receiver
    _mint(receiver, shares);
    
    emit Deposit(msg.sender, receiver, assets, shares);
}
```

#### **`depositDual(uint256 wlfiAmount, uint256 usd1Amount, address receiver)`**
```solidity
function depositDual(
    uint256 wlfiAmount, 
    uint256 usd1Amount, 
    address receiver
) external nonReentrant whenNotPaused returns (uint256 shares) {
    require(wlfiAmount > 0 && usd1Amount > 0, "Invalid amounts");
    
    // Transfer both tokens
    WLFI.safeTransferFrom(msg.sender, address(this), wlfiAmount);
    USD1.safeTransferFrom(msg.sender, address(this), usd1Amount);
    
    // Calculate equivalent assets value
    uint256 totalAssetValue = _calculateAssetValue(wlfiAmount, usd1Amount);
    
    // Mint shares based on total value
    shares = previewDeposit(totalAssetValue);
    _mint(receiver, shares);
    
    // Add to LP position
    _addDualLiquidity(wlfiAmount, usd1Amount);
    
    emit DualDeposit(msg.sender, receiver, wlfiAmount, usd1Amount, shares);
}
```

### **Withdrawal Operations**

#### **`redeem(uint256 shares, address receiver, address owner)`**
```solidity
function redeem(uint256 shares, address receiver, address owner)
    public
    override
    nonReentrant
    whenNotPaused
    returns (uint256 assets)
{
    require(shares > 0, "Invalid shares");
    require(receiver != address(0), "Invalid receiver");
    
    // Check allowance if not owner
    if (msg.sender != owner) {
        _spendAllowance(owner, msg.sender, shares);
    }
    
    // Calculate assets to return
    assets = previewRedeem(shares);
    
    // Remove from LP position
    _removeLiquidity(assets);
    
    // Burn shares
    _burn(owner, shares);
    
    // Transfer assets to receiver
    WLFI.safeTransfer(receiver, assets);
    
    emit Withdraw(msg.sender, receiver, owner, assets, shares);
}
```

#### **`redeemDual(uint256 shares, address receiver, address owner)`**
```solidity
function redeemDual(uint256 shares, address receiver, address owner)
    external
    nonReentrant
    whenNotPaused
    returns (uint256 wlfiAmount, uint256 usd1Amount)
{
    require(shares > 0, "Invalid shares");
    
    if (msg.sender != owner) {
        _spendAllowance(owner, msg.sender, shares);
    }
    
    // Calculate proportional withdrawal
    (wlfiAmount, usd1Amount) = _calculateDualWithdrawal(shares);
    
    // Remove from LP position
    _removeDualLiquidity(shares);
    
    // Burn shares
    _burn(owner, shares);
    
    // Transfer both tokens
    WLFI.safeTransfer(receiver, wlfiAmount);
    USD1.safeTransfer(receiver, usd1Amount);
    
    emit DualWithdraw(msg.sender, receiver, owner, wlfiAmount, usd1Amount, shares);
}
```

## Strategy Implementation

### **Liquidity Management**

#### **`_addLiquidity(uint256 amount)`**
```solidity
function _addLiquidity(uint256 amount) internal {
    // Calculate optimal USD1 amount to pair with WLFI
    uint256 usd1Amount = _calculateOptimalUSD1Amount(amount);
    
    // Ensure we have sufficient USD1 (buy if needed)
    _ensureUSD1Balance(usd1Amount);
    
    // Add liquidity to Uniswap V3 pool
    (uint256 amount0, uint256 amount1) = pool.mint(
        address(this),
        _getCurrentTick(),
        _getTickSpacing(),
        amount,
        usd1Amount,
        _getSlippageParams()
    );
    
    emit LiquidityAdded(amount0, amount1, block.timestamp);
}
```

#### **`rebalance()`**
```solidity
function rebalance() external {
    require(managers[msg.sender] || msg.sender == owner(), "Unauthorized");
    
    // Check if rebalancing is needed
    require(_shouldRebalance(), "Rebalance not needed");
    
    // Get current position
    (uint256 liquidity, int24 tickLower, int24 tickUpper) = _getCurrentPosition();
    
    // Calculate new optimal ticks
    (int24 newTickLower, int24 newTickUpper) = _calculateOptimalTicks();
    
    // Remove current liquidity
    if (liquidity > 0) {
        pool.burn(tickLower, tickUpper, liquidity);
        pool.collect(address(this), tickLower, tickUpper, type(uint128).max, type(uint128).max);
    }
    
    // Add liquidity at new range
    _addLiquidityAtRange(newTickLower, newTickUpper);
    
    emit Rebalance(newTickLower, newTickUpper, block.timestamp);
}
```

### **Price Validation**

#### **`_validatePrice(uint256 expectedPrice)`**
```solidity
function _validatePrice(uint256 expectedPrice) internal view {
    // Get TWAP price
    uint256 twapPrice = _getTWAPPrice();
    
    // Calculate price deviation
    uint256 deviation = expectedPrice > twapPrice 
        ? expectedPrice - twapPrice 
        : twapPrice - expectedPrice;
    
    uint256 maxDeviation = (twapPrice * maxSlippage) / 10000;
    
    require(deviation <= maxDeviation, "Price slippage too high");
}

function _getTWAPPrice() internal view returns (uint256) {
    uint32[] memory secondsAgos = new uint32[](2);
    secondsAgos[0] = twapPeriod;
    secondsAgos[1] = 0;
    
    (int56[] memory tickCumulatives, ) = pool.observe(secondsAgos);
    
    int56 tickCumulativesDelta = tickCumulatives[1] - tickCumulatives[0];
    int24 timeWeightedAverageTick = int24(tickCumulativesDelta / int56(uint56(twapPeriod)));
    
    return TickMath.getSqrtRatioAtTick(timeWeightedAverageTick);
}
```

## 🔒 **Access Control**

### **Manager System**
```solidity
modifier onlyManager() {
    require(managers[msg.sender] || msg.sender == owner(), "Not authorized");
    _;
}

function addManager(address manager) external onlyOwner {
    require(manager != address(0), "Invalid manager");
    managers[manager] = true;
    emit ManagerAdded(manager);
}

function removeManager(address manager) external onlyOwner {
    managers[manager] = false;
    emit ManagerRemoved(manager);
}
```

### **Emergency Controls**
```solidity
function emergencyPause() external onlyOwner {
    _pause();
    emit EmergencyPause(msg.sender, block.timestamp);
}

function emergencyWithdraw(address token, uint256 amount) external onlyOwner whenPaused {
    require(token != address(0), "Invalid token");
    IERC20(token).safeTransfer(owner(), amount);
    emit EmergencyWithdraw(token, amount, block.timestamp);
}
```

## View Functions

### **Asset Calculations**
```solidity
function totalAssets() public view override returns (uint256) {
    return _getTotalManagedAssets();
}

function convertToShares(uint256 assets) public view override returns (uint256) {
    return _convertToShares(assets, Math.Rounding.Down);
}

function convertToAssets(uint256 shares) public view override returns (uint256) {
    return _convertToAssets(shares, Math.Rounding.Down);
}

function getVaultPerformance() external view returns (
    uint256 totalValue,
    uint256 sharePrice,
    uint256 apy,
    uint256 totalFees
) {
    totalValue = totalAssets();
    sharePrice = totalSupply() > 0 ? convertToAssets(1e18) : 1e18;
    apy = _calculateCurrentAPY();
    totalFeees = _getTotalFeesCollected();
}
```

### **Position Information**
```solidity
function getCurrentPosition() external view returns (
    uint256 liquidity,
    int24 tickLower,
    int24 tickUpper,
    uint256 token0Amount,
    uint256 token1Amount
) {
    (liquidity, tickLower, tickUpper) = _getCurrentPosition();
    (token0Amount, token1Amount) = _getPositionAmounts(liquidity, tickLower, tickUpper);
}
```

## Events

```solidity
event DualDeposit(
    address indexed caller,
    address indexed receiver,
    uint256 wlfiAmount,
    uint256 usd1Amount,
    uint256 shares
);

event DualWithdraw(
    address indexed caller,
    address indexed receiver,
    address indexed owner,
    uint256 wlfiAmount,
    uint256 usd1Amount,
    uint256 shares
);

event Rebalance(
    int24 newTickLower,
    int24 newTickUpper,
    uint256 timestamp
);

event LiquidityAdded(
    uint256 amount0,
    uint256 amount1,
    uint256 timestamp
);

event LiquidityRemoved(
    uint256 amount0,
    uint256 amount1,
    uint256 timestamp
);

event FeesCollected(
    uint256 amount0,
    uint256 amount1,
    uint256 timestamp
);

event ManagerAdded(address indexed manager);
event ManagerRemoved(address indexed manager);
event EmergencyPause(address indexed admin, uint256 timestamp);
event EmergencyWithdraw(address indexed token, uint256 amount, uint256 timestamp);
```

## 🧪 **Testing Examples**

```typescript
describe("EagleOVault", () => {
  it("should handle dual-token deposits correctly", async () => {
    const wlfiAmount = ethers.parseEther("1000");
    const usd1Amount = ethers.parseEther("1000");
    
    await wlfi.connect(user).approve(vault.address, wlfiAmount);
    await usd1.connect(user).approve(vault.address, usd1Amount);
    
    const tx = await vault.connect(user).depositDual(
      wlfiAmount,
      usd1Amount,
      user.address
    );
    
    const shares = await vault.balanceOf(user.address);
    expect(shares).to.be.gt(0);
    
    const receipt = await tx.wait();
    expect(receipt.events?.find(e => e.event === "DualDeposit")).to.exist;
  });
  
  it("should rebalance when conditions are met", async () => {
    // Setup initial position
    await vault.connect(user).depositDual(
      ethers.parseEther("1000"),
      ethers.parseEther("1000"),
      user.address
    );
    
    // Simulate price movement
    await mockPriceMovement(pool, 500); // 5% price change
    
    // Rebalance should be needed
    expect(await vault.shouldRebalance()).to.be.true;
    
    // Execute rebalance
    await vault.connect(manager).rebalance();
    
    // Verify new position
    const position = await vault.getCurrentPosition();
    expect(position.liquidity).to.be.gt(0);
  });
});
```

---

**The EagleOVault contract is the heart of the Eagle Omnichain Vault system, providing secure and efficient dual-token yield generation.**

