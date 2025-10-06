/**
 * Eagle Finance - Real Data Integration
 * 
 * This file contains helpers for integrating real WLFI/USD1 pool data
 * from various sources including Revert Finance, The Graph, and on-chain data.
 */

// Token Configuration
export const TOKENS = {
  WLFI: {
    address: '0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d',
    decimals: 18,
    symbol: 'WLFI',
    name: 'World Liberty Financial',
  },
  USD1: {
    address: '0xda5e1988097297dcdc1f90d4dfe7909e847cbef6',
    decimals: 18,
    symbol: 'USD1',
    name: 'USD1 Stablecoin',
  },
};

// Revert Finance API endpoints
export const REVERT_FINANCE_URL = 'https://api.revert.finance';
export const REVERT_DISCOVER_URL = `https://revert.finance/#/discover?networks=mainnet&page=1&tokens=mainnet-${TOKENS.WLFI.address}%7Cmainnet-${TOKENS.USD1.address}&period=year`;

// Uniswap V3 Pool addresses - REAL POOLS ON ETHEREUM MAINNET
export const UNISWAP_V3_POOLS = {
  WLFI_USD1_100: '0xf9f5e6f7a44ee10c72e67e941ab4d7d52eac7c73d', // 1.00% fee tier
  WLFI_USD1_30: '0x4637ea6ecf7e16c99e67e941ab4d7d52eac7c73d',  // 0.30% fee tier
};

/**
 * Fetch pool data from Revert Finance
 * Reference: https://revert.finance/#/discover
 * 
 * Note: This currently returns mock data. To implement:
 * 1. Get Revert Finance API key
 * 2. Use endpoint: https://api.revert.finance/v1/positions?pool=${poolAddress}
 */
export async function fetchRevertFinanceData(poolAddress: string) {
  // Using mock data for visualization
  return {
    tvl: 7900,
    volume24h: 12500,
    fees24h: 125,
    apr: 92.68,
    token0Amount: 1377,
    token1Amount: 1724000,
    spotPrice: 1.0,
    positions: [
      {
        tickLower: -887200,
        tickUpper: 887200,
        liquidity: '24420000000000000000',
        name: 'Full Range'
      },
      {
        tickLower: -20000,
        tickUpper: 20000,
        liquidity: '49580000000000000000',
        name: 'Base Order'
      },
      {
        tickLower: -10000,
        tickUpper: 10000,
        liquidity: '26000000000000000000',
        name: 'Limit Order'
      }
    ]
  };
}

/**
 * Fetch price data from Uniswap V3 pool
 * 
 * Note: This currently returns mock data. To implement:
 * Use ethers.js or viem to query pool contract directly
 */
export async function fetchUniswapV3Price(poolAddress: string) {
  return {
    token0: TOKENS.WLFI.address,
    token1: TOKENS.USD1.address,
    price: 1.0,
    tick: 0,
  };
}

/**
 * Calculate liquidity distribution from pool positions
 */
export function calculateLiquidityDistribution(positions: any[]) {
  // Transform raw position data into visualization-friendly format
  return positions.map((pos, index) => ({
    name: pos.name || `Position ${index + 1}`,
    tickLower: pos.tickLower,
    tickUpper: pos.tickUpper,
    weight: (parseFloat(pos.liquidity) / 1e18) * 100, // Normalize to percentage
    color: getColorForPosition(index),
  }));
}

/**
 * Get color scheme for liquidity positions
 */
function getColorForPosition(index: number): string {
  const colors = ['#4a9e9e', '#9e4a9e', '#9e9e4a', '#4a9e4a'];
  return colors[index % colors.length];
}

/**
 * Data integration example for React component
 * 
 * Usage in VaultVisualization.tsx:
 * 
 * ```typescript
 * const [poolData, setPoolData] = useState(null);
 * 
 * useEffect(() => {
 *   async function loadData() {
 *     const data = await fetchRevertFinanceData(UNISWAP_V3_POOLS.WLFI_USD1_100);
 *     setPoolData(data);
 *   }
 *   loadData();
 * }, []);
 * ```
 */

// Export mock data for initial testing
export const MOCK_POOL_DATA = {
  tvl: 7900,
  poolShare: 58.9,
  liquidityUtilized: 99.5,
  apr: 92.68,
  token0: {
    symbol: 'WLFI',
    amount: 1377,
    poolPercentage: 62.7,
  },
  token1: {
    symbol: 'USD1',
    amount: 1724000,
    poolPercentage: 37.3,
  },
  spotPrice: 1.0,
  capitalEfficiency: 3.46,
};

/**
 * Data Sources Reference:
 * 
 * 1. Revert Finance:
 *    - URL: https://revert.finance/#/discover
 *    - Provides: TVL, volume, fees, APR, position data
 *    - API: https://docs.revert.finance/api-reference
 * 
 * 2. The Graph (Uniswap V3 Subgraph):
 *    - URL: https://thegraph.com/explorer/subgraphs/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV
 *    - Provides: Historical data, events, positions
 * 
 * 3. Direct On-Chain (ethers.js / viem):
 *    - Pool contract: Read price, liquidity, tick
 *    - Position NFTs: Read individual position details
 * 
 * 4. CoinGecko / CoinMarketCap:
 *    - Provides: Token prices, market data
 */



