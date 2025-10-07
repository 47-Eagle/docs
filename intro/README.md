# 47 Eagle Finance - Landing Page

This is the official landing page for 47eagle.com featuring an immersive 3D tunnel animation with scrolling marketing content.

## 🚀 Features

- **3D Tunnel Animation**: Immersive scroll-based journey through space
- **Marketing Text**: Scrolling 3D text showcasing Eagle Finance features
- **Smooth Transitions**: Professional animations powered by Framer Motion
- **Next.js 14**: Modern React framework with App Router
- **Three.js/React Three Fiber**: High-performance 3D graphics
- **Tailwind CSS**: Utility-first styling
- **Golden Branding**: Eagle Finance brand colors throughout

## 🎬 Experience

1. **Loading Screen**: Elegant percentage loader (0-100%)
2. **Tunnel Journey**: Scroll through space with floating 3D text:
   - "DEPOSIT WLFI & USD1"
   - "ERC-4626 OMNICHAIN VAULTS"
   - "EARN ON ONE CHAIN"
   - "EARN MORE ON ANOTHER"
   - "SIMULTANEOUSLY"
   - "AUTOMATED REBALANCING"
   - "MAXIMIZED RETURNS"
   - "INTRODUCING"
   - "47 EAGLE"
3. **CTA Button**: Golden "EXPLORE DOCS" button linking to documentation

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 🏗️ Build

```bash
npm run build
npm start
```

## 🎨 Customization

### Tunnel Text

Edit the text sections in `app/components/three/tunnel.tsx`:

```tsx
<TextSection text="YOUR TEXT" position={[0, 0, -20]} />
```

### Colors

Update the golden accents in:
- Tunnel emissive color: `#d4af37`
- Button colors: `[#d4af37]` in Tailwind classes
- Hover states: `[#f5e89f]`

### CTA Button

Update the link in `app/page.tsx`:

```tsx
onClick={() => window.location.href = 'https://your-docs.com'}
```

## 📁 Project Structure

```
intro/
├── app/
│   ├── components/
│   │   ├── three/
│   │   │   ├── tunnel.tsx    # 3D tunnel component
│   │   │   └── scene.tsx     # Three.js scene setup
│   │   └── ui/
│   │       ├── nav.tsx       # Navigation component
│   │       └── mouse-trail.tsx
│   ├── page.tsx              # Main landing page
│   └── layout.tsx            # Root layout
├── public/
│   └── fonts/                # 3D text fonts
└── package.json
```

## 🌐 Deployment

This Next.js app can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Any Node.js hosting**

### Environment Variables

No environment variables required for basic functionality.

## 📝 Notes

- The tunnel uses WebGL and may not work on older browsers
- Optimized for desktop but responsive on mobile
- Scroll-based animation requires JavaScript

## 🔗 Links

- [Documentation](https://docs.47eagle.com)
- [Main Website](https://47eagle.com)
- [GitHub](https://github.com/47-Eagle)

---

**Built with ❤️ by the 47 Eagle Finance Team**

