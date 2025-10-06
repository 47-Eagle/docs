# Eagle Vault Interactive Visualizations

## 🎯 Overview

This directory contains interactive 3D visualizations for Eagle Finance documentation, showcasing how our omnichain vault strategies work with Uniswap V3 and Charm Finance.

## 📁 Components

### VaultVisualization.tsx

**Interactive 3D Uniswap V3 Liquidity Visualization**

- **Purpose**: Demonstrates how Eagle OVault positions liquidity across Uniswap V3 price ranges
- **Features**:
  - 3D interactive visualization using React Three Fiber
  - Real-time liquidity depth charts
  - Price range sliders
  - Statistical cards showing vault metrics
  - 2D charts for APR and fee performance

- **Configuration**:
  - Token Pair: WLFI/USD1
  - Current implementation shows $1.00 price point
  - Adjustable liquidity ranges
  - Visual representation of Charm Finance Alpha Vault strategies

## 🚀 Usage

### Accessing the Visualization

The visualization is available at:
```
https://docs.47eagle.com/interactive/vault-visualization
```

### Embedding in Documentation

To embed the visualization in a doc page:

```tsx
import VaultVisualization from '@site/src/components/liquidity-visualization/VaultVisualization';

<VaultVisualization />
```

## 🛠️ Technical Stack

- **React Three Fiber**: 3D rendering engine
- **Three.js**: WebGL 3D library
- **@react-three/drei**: Helper components for R3F
- **Recharts**: 2D charts and graphs
- **Radix UI**: Accessible UI primitives

## 📊 Data Configuration

### Current Settings

```typescript
const WLFI_PRICE = 1.0 // $1.00 per WLFI
const CURRENT_TICK = Math.floor(Math.log(1.0) / Math.log(1.0001))
```

### Customization

To update for different price ranges or tokens, modify:

1. **Token Configuration** (lines 11-15):
   ```typescript
   const WLFI_DECIMALS = 18
   const USD1_DECIMALS = 18
   const WLFI_PRICE = 1.0
   ```

2. **Tick Calculation** (line 12):
   - Adjust based on actual pool price
   - Uniswap V3 tick formula: `tick = log(price) / log(1.0001)`

3. **Liquidity Ranges** (lines 43-44):
   - Modify tick ranges for different visualization scopes
   - Current: ±40,000 ticks around current price

## 🎨 Styling

The visualization uses:
- Docusaurus theme variables for colors
- Responsive design for mobile/desktop
- Dark mode support
- Eagle brand colors (gold/yellow: `#f6d55c`, `#fbbf24`)

## 🔧 Development

### Local Testing

```bash
cd /home/akitav2/eagle-docs-clean
npm install
npm start
```

Visit: `http://localhost:3000/interactive/vault-visualization`

### Building

```bash
npm run build
```

## 📝 Future Enhancements

Potential improvements:
- [ ] Real-time on-chain data integration
- [ ] Multiple pool visualizations
- [ ] Historical performance replay
- [ ] Custom range selection
- [ ] Export visualization as image/video
- [ ] Mobile touch controls optimization
- [ ] WebXR/VR mode support

## 🐛 Troubleshooting

### Common Issues

**3D scene not rendering:**
- Check browser WebGL support
- Verify Three.js dependencies installed
- Check console for errors

**Performance issues:**
- Reduce point density in visualization
- Lower quality settings on mobile
- Check GPU acceleration enabled

**Import errors:**
- Verify all UI components copied correctly
- Check Docusaurus aliases in `docusaurus.config.ts`
- Ensure dependencies installed: `npm install`

## 📚 Related Documentation

- [Charm Finance Integration](/users/charm-finance-integration)
- [Vault Operations](/users/vault-operations)
- [Architecture](/dev/architecture)

---

**Maintained by**: 47 Eagle Finance Development Team  
**Last Updated**: October 2025

