# 📊 Real Data Integration Guide

## Overview

This guide explains how to integrate real WLFI/USD1 pool data from [Revert Finance](https://revert.finance/#/discover?networks=mainnet&page=1&tokens=mainnet-0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d%7Cmainnet-0xda5e1988097297dcdc1f90d4dfe7909e847cbef6&period=year) and other sources into the Eagle Vault 3D visualization.

---

## 🔑 Token Addresses

### WLFI Token
- **Address**: `0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d`
- **Symbol**: WLFI
- **Name**: World Liberty Financial
- **Decimals**: 18

### USD1 Token
- **Address**: `0xda5e1988097297dcdc1f90d4dfe7909e847cbef6`
- **Symbol**: USD1
- **Name**: USD1 Stablecoin
- **Decimals**: 18

---

## 📡 Data Sources

### 1. **Revert Finance** (Recommended)

**Link**: [Revert Finance WLFI/USD1 Pool](https://revert.finance/#/discover?networks=mainnet&page=1&tokens=mainnet-0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d%7Cmainnet-0xda5e1988097297dcdc1f90d4dfe7909e847cbef6&period=year)

**What you can get:**
- Total Value Locked (TVL)
- 24h Volume
- 24h Fees
- APR/APY calculations
- Position data (tick ranges, liquidity amounts)
- Historical performance

**API Documentation**: https://docs.revert.finance/api-reference

**Sample API Call**:
```bash
# Note: Requires API key
curl https://api.revert.finance/v1/pools/mainnet/0x[POOL_ADDRESS]
```

---

### 2. **The Graph (Uniswap V3 Subgraph)**

**Endpoint**: https://thegraph.com/explorer/subgraphs/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV

**Sample Query**:
```graphql
{
  pool(id: "0x[POOL_ADDRESS]") {
    token0 {
      symbol
      decimals
    }
    token1 {
      symbol
      decimals
    }
    sqrtPrice
    tick
    liquidity
    volumeUSD
    feesUSD
    txCount
  }
  
  positions(where: {pool: "0x[POOL_ADDRESS]"}) {
    id
    tickLower
    tickUpper
    liquidity
    depositedToken0
    depositedToken1
  }
}
```

---

### 3. **Direct On-Chain Queries**

**Using ethers.js or viem**:

```typescript
import { ethers } from 'ethers';

const POOL_ABI = [
  'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
  'function liquidity() external view returns (uint128)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
];

async function getPoolData(poolAddress: string) {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const pool = new ethers.Contract(poolAddress, POOL_ABI, provider);
  
  const [slot0, liquidity, token0, token1] = await Promise.all([
    pool.slot0(),
    pool.liquidity(),
    pool.token0(),
    pool.token1(),
  ]);
  
  return {
    sqrtPrice: slot0.sqrtPriceX96,
    tick: slot0.tick,
    liquidity: liquidity.toString(),
    token0,
    token1,
  };
}
```

---

### 4. **DeFi Llama**

**API**: https://defillama.com/docs/api

**Endpoint**:
```
https://api.llama.fi/protocol/[PROTOCOL_NAME]
```

Good for:
- TVL data
- Historical trends
- Multi-chain aggregation

---

## 🔧 Implementation Steps

### Step 1: Install Dependencies

```bash
npm install ethers # or viem
npm install axios
npm install @apollo/client graphql
```

### Step 2: Create Data Fetcher Service

See `vaultDataIntegration.ts` for the base implementation.

### Step 3: Update Visualization Component

In `VaultVisualization.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { fetchRevertFinanceData } from './vaultDataIntegration';

export default function VaultVisualization() {
  const [poolData, setPoolData] = useState(MOCK_POOL_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRealData() {
      try {
        const data = await fetchRevertFinanceData(POOL_ADDRESS);
        setPoolData(data);
      } catch (error) {
        console.error('Failed to fetch pool data:', error);
        // Fallback to mock data
      } finally {
        setLoading(false);
      }
    }
    
    loadRealData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadRealData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Use poolData instead of hardcoded values
  // ...
}
```

---

## 📊 Data Mapping

### Revert Finance Response → Visualization

```typescript
interface RevertFinanceResponse {
  pool: {
    address: string;
    token0: { symbol: string; address: string };
    token1: { symbol: string; address: string };
    tvl: number;
    volume24h: number;
    fees24h: number;
    apr: number;
  };
  positions: Array<{
    tickLower: number;
    tickUpper: number;
    liquidity: string;
    owner: string;
  }>;
}

// Transform to visualization format
const liquidityData = response.positions.map((pos, index) => ({
  name: `Position ${index + 1}`,
  tickLower: pos.tickLower,
  tickUpper: pos.tickUpper,
  weight: calculateWeight(pos.liquidity, totalLiquidity),
  color: COLORS[index % COLORS.length],
}));
```

---

## 🎨 Enhanced Z-Axis Visualization

### Current Improvements:
- ✅ Z-axis depth increased from `2` to `12` (6x deeper!)
- ✅ Better camera angle: `[0, 12, 25]` with wider FOV
- ✅ Enhanced lighting for depth perception
- ✅ Damped orbit controls for smooth interaction

### Visual Result:
The liquidity boxes now have **much more prominent 3D depth**, making it easier to see:
- The distribution of liquidity across price ranges
- How different positions overlap
- The relative sizes of different strategies

---

## 🚀 Next Steps

### Phase 1: Mock Data (✅ Complete)
- [x] Set up visualization structure
- [x] Increase Z-axis depth
- [x] Update token names (WLFI/USD1)
- [x] Add data source comments

### Phase 2: API Integration (In Progress)
- [ ] Get Revert Finance API key
- [ ] Implement data fetching in `vaultDataIntegration.ts`
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add data refresh mechanism

### Phase 3: Real-Time Updates
- [ ] WebSocket connection for live updates
- [ ] Automated data refresh (30s intervals)
- [ ] Historical data playback
- [ ] Performance charts

### Phase 4: Advanced Features
- [ ] Multiple pool visualization
- [ ] Position tracking for specific addresses
- [ ] Impermanent loss calculator
- [ ] Strategy comparison tool

---

## 🔐 API Keys Needed

### Revert Finance
- Sign up at: https://revert.finance
- Get API key from dashboard
- Add to `.env`:
  ```
  REVERT_FINANCE_API_KEY=your_key_here
  ```

### Infura/Alchemy (for on-chain data)
- RPC endpoint for Ethereum mainnet
- Add to `.env`:
  ```
  RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
  ```

### The Graph (Optional)
- Free tier available
- Rate limits apply

---

## 📝 Example: Fetch Real Pool Address

If you need to find the actual Uniswap V3 pool address for WLFI/USD1:

```typescript
// Uniswap V3 Factory: 0x1F98431c8aD98523631AE4a59f267346ea31F984

const FACTORY_ABI = [
  'function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)'
];

const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);

// Check different fee tiers
const pool100 = await factory.getPool(WLFI_ADDRESS, USD1_ADDRESS, 10000); // 1%
const pool30 = await factory.getPool(WLFI_ADDRESS, USD1_ADDRESS, 3000);   // 0.3%
const pool5 = await factory.getPool(WLFI_ADDRESS, USD1_ADDRESS, 500);     // 0.05%

console.log('Pool addresses:', { pool100, pool30, pool5 });
```

---

## 🎯 What Data Do You Need?

Please specify which metrics are most important for your visualization:

1. **Essential Metrics** (currently shown):
   - TVL
   - Pool Share %
   - Liquidity Utilization
   - APR
   - Token balances
   - Spot price

2. **Additional Metrics** (can add):
   - 24h Volume
   - 24h Fees
   - Impermanent Loss
   - Position count
   - Swap count
   - Fee tier breakdown

3. **Historical Data**:
   - Price charts
   - Volume over time
   - Liquidity changes
   - APR trends

Let me know what specific data points you want to prioritize, and I'll implement the fetching logic!

---

## 📚 References

- [Revert Finance Docs](https://docs.revert.finance)
- [Uniswap V3 Documentation](https://docs.uniswap.org/protocol/V3/introduction)
- [The Graph Documentation](https://thegraph.com/docs/en/)
- [ethers.js Documentation](https://docs.ethers.org/v5/)
- [Viem Documentation](https://viem.sh/)

---

**Ready to integrate real data?** The foundation is set up - just need the data sources configured!



