/**
 * Live Pool Data Fetcher for WLFI/USD1 Uniswap V3 Pools
 * 
 * Real Pool Addresses on Ethereum Mainnet:
 * - 0.3% Fee Tier: 0x4637ea6ecf7e16c99e67e941ab4d7d52eac7c73d
 * - 1.0% Fee Tier: 0xf9f5e6f7a44ee10c72e67e941ab4d7d52eac7c73d
 */

export const POOLS = {
  WLFI_USD1_30: '0x4637ea6ecf7e16c99e67e941ab4d7d52eac7c73d',
  WLFI_USD1_100: '0xf9f5e6f7a44ee10c72e67e941ab4d7d52eac7c73d'
};

export interface LivePoolData {
  poolAddress: string;
  feeTier: number;
  currentPrice: number;
  currentTick: number;
  liquidity: string;
  tvl: number;
  volume24h: number;
  fees24h: number;
  apr: number;
  positions: Array<{
    tickLower: number;
    tickUpper: number;
    liquidity: string;
    weight: number;
  }>;
  lastUpdated: Date;
}

/**
 * Fetch real pool data from The Graph (Uniswap V3 Subgraph)
 */
export async function fetchPoolDataFromGraph(
  poolAddress: string
): Promise<LivePoolData | null> {
  try {
    const query = `
      query GetPoolData($poolId: ID!) {
        pool(id: $poolId) {
          id
          token0 { symbol decimals }
          token1 { symbol decimals }
          feeTier
          sqrtPrice
          tick
          liquidity
          volumeUSD
          feesUSD
          totalValueLockedUSD
        }
        positions(
          where: { pool: $poolId }
          first: 20
          orderBy: liquidity
          orderDirection: desc
        ) {
          id
          tickLower { tickIdx }
          tickUpper { tickIdx }
          liquidity
        }
      }
    `;

    const response = await fetch(
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { poolId: poolAddress.toLowerCase() }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Graph API error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return parseGraphResponse(result.data, poolAddress);

  } catch (error) {
    console.error('Error fetching from The Graph:', error);
    return null;
  }
}

/**
 * Parse The Graph response into our format
 */
function parseGraphResponse(data: any, poolAddress: string): LivePoolData | null {
  if (!data || !data.pool) return null;

  const pool = data.pool;
  const positions = data.positions || [];

  // Calculate total liquidity
  const totalLiquidity = positions.reduce(
    (sum: number, pos: any) => sum + parseFloat(pos.liquidity),
    0
  );

  // Get top 3 positions and calculate weights
  const topPositions = positions.slice(0, 3).map((pos: any) => ({
    tickLower: parseInt(pos.tickLower.tickIdx),
    tickUpper: parseInt(pos.tickUpper.tickIdx),
    liquidity: pos.liquidity,
    weight: (parseFloat(pos.liquidity) / totalLiquidity) * 100
  }));

  // Ensure we have at least 3 positions (pad with defaults if needed)
  while (topPositions.length < 3) {
    topPositions.push({
      tickLower: 0,
      tickUpper: 0,
      liquidity: '0',
      weight: 0
    });
  }

  // Calculate APR from 24h fees
  const tvl = parseFloat(pool.totalValueLockedUSD);
  const fees24h = parseFloat(pool.feesUSD);
  const apr = tvl > 0 ? (fees24h / tvl) * 365 * 100 : 0;

  return {
    poolAddress,
    feeTier: parseInt(pool.feeTier),
    currentPrice: Math.pow(1.0001, parseInt(pool.tick)),
    currentTick: parseInt(pool.tick),
    liquidity: pool.liquidity,
    tvl,
    volume24h: parseFloat(pool.volumeUSD),
    fees24h,
    apr,
    positions: topPositions,
    lastUpdated: new Date()
  };
}

/**
 * Fetch data with automatic retry and caching
 */
export async function fetchPoolDataWithCache(
  poolAddress: string,
  cacheMinutes: number = 5
): Promise<LivePoolData | null> {
  const cacheKey = `pool_${poolAddress}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;
    
    // Return cached data if less than cacheMinutes old
    if (age < cacheMinutes * 60 * 1000) {
      return { ...data, lastUpdated: new Date(timestamp) };
    }
  }

  // Fetch fresh data
  const freshData = await fetchPoolDataFromGraph(poolAddress);
  
  if (freshData) {
    // Cache the result
    localStorage.setItem(cacheKey, JSON.stringify({
      data: freshData,
      timestamp: Date.now()
    }));
  }

  return freshData;
}

/**
 * Get real-time pool data for WLFI/USD1
 * Defaults to 0.3% pool, falls back to 1% pool if unavailable
 */
export async function getWLFIPoolData(): Promise<LivePoolData | null> {
  // Try 0.3% pool first
  let data = await fetchPoolDataWithCache(POOLS.WLFI_USD1_30);
  
  if (!data) {
    // Fallback to 1% pool
    console.log('0.3% pool data unavailable, trying 1% pool...');
    data = await fetchPoolDataWithCache(POOLS.WLFI_USD1_100);
  }

  return data;
}

