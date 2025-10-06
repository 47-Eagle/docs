# 47 EAGLE Finance - Complete Theme Guide

**Use this document to replicate the exact theme on other projects**

---

## 🎨 Brand Colors

### Primary Brand Color
```css
--brand-gold: #d4af37;
--brand-gold-dark: #b8941f;
--brand-gold-darker: #a0800d;
--brand-gold-light: #e2c55f;
--brand-gold-lighter: #edd577;
--brand-gold-lightest: #f5e89f;
```

### Neutral Palette (Light Mode)
```css
--white: #ffffff;
--gray-50: #fafafa;
--gray-100: #f5f5f5;
--gray-200: #e5e5e5;
--gray-300: #d4d4d4;
--gray-400: #a3a3a3;
--gray-500: #737373;
--gray-600: #525252;
--gray-700: #404040;
--gray-800: #262626;
--gray-900: #171717;
--black: #0a0a0a;
```

### Dark Mode Colors
```css
--background: #0a0a0a;
--surface: #171717;
--surface-elevated: #262626;
--text-primary: #fafafa;
--text-secondary: #d4d4d4;
--text-muted: #a3a3a3;
--border: #262626;
--border-hover: #404040;
```

---

## 🎭 3D Visualization Colors

### Liquidity Positions
```javascript
{
  fullRange: '#6366f1',      // Elegant Indigo
  baseOrder: '#d4af37',      // Eagle Golden (brand)
  limitOrder: '#8b5cf6',     // Royal Purple
  currentPrice: '#d4af37'    // Golden accent
}
```

### Position Materials (Three.js)
```javascript
{
  opacity: 0.75,
  transparent: true,
  emissive: [same as color],
  emissiveIntensity: 0.2,
  metalness: 0.3,
  roughness: 0.4
}
```

### 3D Scene Lighting
```javascript
{
  ambient: { intensity: 0.6, color: 0xffffff },
  directional: { intensity: 0.8, color: 0xffffff },
  point: { intensity: 0.3, color: 0xd4af37 },
  spot: { intensity: 0.4, color: 0xf6d55c }
}
```

---

## 📝 Typography

### Font Stack
```css
--font-primary: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Courier New', monospace;
```

### Font Weights
```css
--weight-light: 300;
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-black: 900;
```

### Font Sizes
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 2rem;        /* 32px */
--text-4xl: 2.5rem;      /* 40px */
--text-5xl: 3.5rem;      /* 56px */
```

### Heading Styles
```css
h1 { 
  font-size: 2.5rem; 
  font-weight: 600; 
  letter-spacing: -0.02em; 
  color: white;
}
h2 { 
  font-size: 2rem; 
  font-weight: 600; 
  letter-spacing: -0.02em; 
  color: white;
}
h3 { 
  font-size: 1.5rem; 
  font-weight: 600; 
  color: #d4af37; 
}
```

---

## 🎪 Loading Screen (Vault Animation)

### Vault Container
```css
.vault-frame {
  width: 260px;
  height: 260px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.02) 0%,
    rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 1px rgba(212, 175, 55, 0.3),
    inset 0 0 60px rgba(0, 0, 0, 0.6);
}
```

### Golden Liquid Fill
```css
.vault-liquid {
  background: linear-gradient(to top, 
    rgba(212, 175, 55, 0.35) 0%,
    rgba(212, 175, 55, 0.2) 60%,
    rgba(212, 175, 55, 0.05) 100%);
  transition: height 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.vault-liquid::before {
  /* Wave animation */
  animation: wave 3s ease-in-out infinite;
  filter: blur(2px);
}
```

### Percentage Display
```css
#loading-percentage {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.5rem;
  color: white;
  font-variant-numeric: tabular-nums;
}
```

---

## 🌊 Tunnel Animation (Homepage)

### Tunnel Wireframe
```javascript
{
  color: 0xffffff,
  wireframe: true,
  transparent: true,
  opacity: 0.25,
  emissive: 0xd4af37,        // Golden glow
  emissiveIntensity: 0.1,
  shininess: 100,
  side: THREE.DoubleSide
}
```

### 3D Text (Tech Stack Labels)
```javascript
{
  font: 'helvetiker_regular',
  size: 1.5,
  height: 0.2,
  material: {
    color: 0xffffff,
    emissive: 0xffffee,      // Warm white glow
    emissiveIntensity: 0.3,  // Base glow
    shininess: 100
  }
}
```

### Camera Movement
```javascript
{
  speed: 0.002,              // Very slow for readability
  smoothing: 0.08,           // Smooth interpolation
  cameraInterpolation: 0.1   // Smooth camera follow
}
```

---

## 💎 Glassmorphism Effects

### Standard Glass Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

### Button Glassmorphism
```css
.glass-button {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 6px;
  padding: 0.875rem 2.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-button:hover {
  border-color: rgba(212, 175, 55, 0.5);
  box-shadow: 0 6px 24px rgba(212, 175, 55, 0.2);
  transform: translateY(-2px);
}
```

---

## 🔲 Card Styles

### Metric Card
```css
.metric-card {
  background: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  backdrop-filter: blur(8px);
}
```

### Feature Card
```css
.feature-card {
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
```

---

## 🎯 Transitions & Animations

### Standard Transition
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Smooth Fade
```css
transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
```

### Shimmer Animation
```css
@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

animation: shimmer 3s ease-in-out infinite;
background-size: 200% 200%;
```

### Wave Animation (Liquid)
```css
@keyframes wave {
  0%, 100% { 
    transform: translateX(0);
    opacity: 0.7;
  }
  50% { 
    transform: translateX(10px);
    opacity: 1;
  }
}
```

---

## 📐 Spacing System

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

---

## 🌓 Shadow System

```css
/* Light Mode */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.12);

/* Dark Mode */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.5);

/* Golden Glow */
box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
```

---

## 🔘 Border Radius

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-3xl: 24px;
--radius-full: 9999px;
```

---

## 🎪 Component Patterns

### Info Tip Box
```jsx
:::tip Interactive Controls
**Rotate**: Drag • **Zoom**: Scroll • **Views**: Toggle
:::
```

```css
.admonition {
  border-radius: 8px;
  border-left-width: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
```

### Button Styles

**Primary:**
```css
background: #d4af37;
color: white;
padding: 0.625rem 1.25rem;
border-radius: 8px;
font-weight: 500;
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

**Secondary/Glass:**
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(10px);
border: 1px solid rgba(212, 175, 55, 0.3);
color: rgba(255, 255, 255, 0.9);
```

**Hover States:**
```css
:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(212, 175, 55, 0.2);
  border-color: rgba(212, 175, 55, 0.5);
}
```

---

## 📊 3D Visualization Specifics

### Canvas Setup
```javascript
<Canvas
  camera={{ position: [15, 15, 15], fov: 50 }}
  style={{ 
    background: 'linear-gradient(to bottom, rgb(10,10,10), rgb(23,23,23))',
    borderRadius: '0.75rem'
  }}
>
  <color attach="background" args={['#0a0a0a']} />
  <fog attach="fog" args={['#0a0a0a', 25, 60]} />
  <ambientLight intensity={0.6} />
  <directionalLight position={[10, 10, 5]} intensity={0.8} />
  <pointLight position={[-10, -10, -5]} intensity={0.3} color="#d4af37" />
  <spotLight position={[0, 20, 0]} intensity={0.4} color="#f6d55c" />
</Canvas>
```

### Grid Configuration
```javascript
{
  size: 20,
  divisions: 20,
  colorCenterLine: '#d4af37',
  colorGrid: '#262626'
}
```

---

## 🎨 Page-Specific Styles

### Hero Section
```jsx
<div style={{ 
  textAlign: 'center', 
  marginBottom: '3rem' 
}}>
  <h1>Welcome to Eagle Finance</h1>
  <p style={{ 
    fontSize: '1.5rem', 
    color: '#d4af37', 
    fontWeight: '300', 
    marginTop: '1rem', 
    marginBottom: '2rem' 
  }}>
    Professional DeFi yields, accessible everywhere
  </p>
</div>
```

### Feature Grid
```jsx
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
  gap: '1.5rem' 
}}>
  <div style={{ 
    padding: '1.5rem', 
    backgroundColor: 'rgba(0,0,0,0.2)', 
    borderRadius: '1rem', 
    border: '1px solid rgba(59, 130, 246, 0.3)' 
  }}>
    <h3 style={{ color: '#3b82f6', marginTop: 0 }}>Feature Title</h3>
    <p>Feature description</p>
  </div>
</div>
```

---

## 🔄 Status Colors

```css
--success: #10b981;    /* Green - Live, Active */
--info: #3b82f6;       /* Blue - Info */
--warning: #fbbf24;    /* Yellow - Warning */
--error: #ef4444;      /* Red - Error */
--pending: #a855f7;    /* Purple - Coming Soon */
```

---

## 🎬 Animation Timing

```css
/* Fast interactions */
--duration-fast: 0.15s;

/* Standard interactions */
--duration-base: 0.3s;

/* Slow, elegant transitions */
--duration-slow: 0.8s;

/* Extra slow (page transitions) */
--duration-slowest: 1.5s;

/* Easing */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { ... }

/* Tablet */
@media (max-width: 996px) { ... }

/* Desktop */
@media (min-width: 997px) { ... }

/* Wide Desktop */
@media (min-width: 1400px) { ... }
```

---

## 🎯 Key Design Principles

1. **Minimalist First** - Clean, spacious, uncluttered
2. **Golden Accents** - Strategic use of brand color (#d4af37)
3. **Glassmorphism** - Subtle blur and transparency
4. **Smooth Transitions** - cubic-bezier(0.4, 0, 0.2, 1)
5. **High Contrast** - White text on dark backgrounds
6. **Premium Feel** - Refined spacing, elegant shadows
7. **Mobile-First** - Responsive and touch-friendly

---

## 🖼️ Background Patterns

### Dark Gradient
```css
background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
```

### Surface Gradient
```css
background: linear-gradient(135deg, 
  rgba(255, 255, 255, 0.03) 0%,
  rgba(255, 255, 255, 0.01) 100%);
```

---

## 📋 Quick Copy Template

For a new page matching this theme:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    :root {
      --brand-gold: #d4af37;
      --background: #0a0a0a;
      --text: #fafafa;
      --surface: #171717;
      --border: rgba(212, 175, 55, 0.2);
    }
    
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: var(--background);
      color: var(--text);
      margin: 0;
      line-height: 1.75;
    }
    
    .card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .button {
      background: var(--brand-gold);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(212, 175, 55, 0.3);
    }
  </style>
</head>
<body>
  <!-- Your content -->
</body>
</html>
```

---

## 🎨 Logo & Assets

**Logo URL:**
```
https://tomato-abundant-urial-204.mypinata.cloud/ipfs/bafybeigzyatm2pgrkqbnskyvflnagtqli6rgh7wv7t2znaywkm2pixmkxy
```

**Usage:**
- Navbar: 32px height, white filter
- Loading screen: 60-80px
- Vault door: 80px with golden drop-shadow

---

## 🚀 Implementation Checklist

- [ ] Set primary brand color to #d4af37
- [ ] Use Inter font for body text
- [ ] Dark background (#0a0a0a)
- [ ] White text (#fafafa) with high contrast
- [ ] Glassmorphism for cards (backdrop-filter: blur())
- [ ] Golden borders (rgba(212, 175, 55, 0.2-0.5))
- [ ] Smooth transitions (cubic-bezier(0.4, 0, 0.2, 1))
- [ ] Minimal shadows
- [ ] 8px border radius
- [ ] Letter-spacing: -0.02em for headings

---

**This theme creates a modern, premium, professional look with elegant golden accents. Copy the relevant sections for your new project!** ✨
