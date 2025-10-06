# 🦅 Eagle Omnichain Vault Documentation

**Modern, elegant documentation for the next-generation omnichain DeFi vault powered by LayerZero.**

[![Deploy to GitHub Pages](https://github.com/47-Eagle/docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/47-Eagle/docs/actions/workflows/deploy.yml)
[![Documentation](https://img.shields.io/badge/docs-live-blue.svg)](https://47-Eagle.github.io/docs/)
[![Built with Docusaurus](https://img.shields.io/badge/built%20with-Docusaurus-brightgreen.svg)](https://docusaurus.io/)

## 🌟 **Features**

- 📱 **Mobile-Responsive**: Perfect experience on all devices
- 🌙 **Dark/Light Mode**: Automatic theme switching with high contrast text
- 🔍 **Advanced Search**: Find information quickly
- 🌐 **Multi-Chain Ready**: Documentation for all supported networks
- 📊 **Interactive Diagrams**: Mermaid diagrams explaining complex concepts
- ⚡ **Fast Loading**: Optimized for speed and performance
- 🎨 **Beautiful Design**: Modern UI with Eagle branding

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Local Development
```bash
# Clone the repository
git clone https://github.com/47-Eagle/docs.git
cd docs

# Install dependencies
npm install

# Start development server
npm run start

# Your documentation will be available at http://localhost:3000
```

### Build for Production
```bash
# Build static files
npm run build

# Serve locally to test
npm run serve
```

## 📁 **Documentation Structure**

```
docs/                           # Developer Documentation
├── dev/                       # Getting Started for Developers
│   ├── overview.md           # Project overview
│   ├── quick-start.md        # 10-minute setup guide
│   ├── architecture.md       # System architecture deep dive
│   ├── deployment.md         # Deployment instructions
│   ├── testing.md           # Testing strategies
│   ├── security.md          # Security considerations
│   └── vanity-addresses.md   # Vanity address generation
├── concepts/                  # Core Concepts
│   ├── layerzero-integration.md  # LayerZero integration
│   ├── ovault-pattern.md        # OVault pattern explanation
│   ├── dual-token-strategy.md   # Dual-token strategy
│   └── cross-chain-flows.md     # Cross-chain operation flows
├── contracts/                # Smart Contract Documentation
│   ├── eagle-ovault.md       # Main vault contract
│   ├── share-oft-adapter.md  # Share OFT adapter
│   ├── ovault-composer.md    # OVault composer
│   ├── asset-ofts.md        # Asset OFT contracts
│   └── share-oft.md         # Share OFT contract
├── api/                      # API Reference
│   ├── overview.md          # API overview
│   ├── vault-operations.md  # Vault operation APIs
│   ├── cross-chain.md       # Cross-chain APIs
│   └── hardhat-tasks.md     # Hardhat task reference
└── advanced/                 # Advanced Topics
    ├── gas-optimization.md   # Gas optimization techniques
    ├── monitoring.md        # Monitoring and analytics
    └── troubleshooting.md   # Common issues and solutions

docs/users/                    # User-Friendly Documentation
├── index.mdx                # Welcome page for users
├── charm-finance-integration.mdx  # 3D visualization
├── vault-operations.md      # How to use the vault
├── withdrawals-and-liquidity.md   # Withdrawals
└── user-faq.md              # Frequently asked questions
```

## 🎯 **Documentation Philosophy**

### **Developer-Focused**
- **Comprehensive**: Complete technical documentation
- **Code Examples**: Real, working code snippets
- **Architecture Diagrams**: Visual system explanations
- **Best Practices**: Production-ready guidance

### **User-Friendly**
- **Plain English**: No unnecessary jargon
- **Step-by-Step**: Clear, actionable instructions
- **Visual Aids**: Diagrams and flowcharts
- **FAQ Section**: Common questions answered

### **Accessibility First**
- **High Contrast**: Text optimized for readability
- **Screen Reader Compatible**: Proper semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Mobile Optimized**: Works perfectly on all devices

## 🔧 **Configuration**

### **Docusaurus Configuration**
The site is configured in `docusaurus.config.ts` with:
- Eagle branding and colors
- LayerZero and Uniswap external links
- GitHub integration for editing
- Mermaid diagram support
- Custom CSS with Eagle theme

### **Navigation Structure**
Organized into two main sections:
- **👨‍💻 Developers**: Technical documentation
- **👤 Users**: User-friendly guides

### **Custom Styling**
- Eagle purple primary color (`#4f46e5`)
- High contrast text for accessibility
- Modern design with subtle gradients
- Dark mode optimized for developers

## 🚀 **Deployment**

### **Automatic Deployment**
The documentation automatically deploys to GitHub Pages when you push to the `main` branch:

1. GitHub Actions builds the site
2. Generated files are pushed to `gh-pages` branch
3. Site is available at `https://47-Eagle.github.io/docs/`

### **Manual Deployment**
```bash
# Deploy to GitHub Pages
GIT_USER=<your-github-username> npm run deploy
```

## 🤝 **Contributing**

We welcome contributions to improve the documentation!

### **Quick Contributions**
- **Typos**: Fix directly via GitHub's edit button
- **Small Changes**: Make PR with clear description
- **New Content**: Follow existing structure and style

### **Major Changes**
1. **Open Issue**: Discuss significant changes first
2. **Fork Repository**: Create your own copy
3. **Create Branch**: Use descriptive branch name
4. **Make Changes**: Follow style guide
5. **Test Locally**: Ensure everything works
6. **Submit PR**: Clear title and description

### **Style Guide**
- **Headings**: Use sentence case with emojis
- **Code Blocks**: Always specify language
- **Links**: Use descriptive link text
- **Diagrams**: Use Mermaid for technical diagrams
- **Tone**: Professional but friendly

## 📊 **Analytics & Monitoring**

### **Performance Tracking**
- **Build Times**: Monitored via GitHub Actions
- **Lighthouse Scores**: Regular performance audits
- **Bundle Size**: Optimized for fast loading

### **User Analytics** (Optional)
Ready for Google Analytics integration:
```typescript
// In docusaurus.config.ts
gtag: {
  trackingID: 'G-XXXXXXXXXX',
  anonymizeIP: true,
}
```

## 🛠️ **Development Tools**

### **Available Scripts**
```bash
npm run start          # Start development server
npm run build          # Build for production  
npm run serve          # Serve production build
npm run clear          # Clear Docusaurus cache
npm run typecheck      # TypeScript type checking
npm run swizzle        # Customize Docusaurus components
```

### **Useful Commands**
```bash
# Generate new documentation
npm run docusaurus docs:version 1.0.0

# Add translations
npm run write-translations

# Generate heading IDs
npm run write-heading-ids
```

## 🔍 **SEO Optimization**

The documentation is optimized for search engines:
- **Meta Descriptions**: Each page has descriptive meta tags
- **Structured Data**: Schema.org markup for better indexing
- **Sitemap**: Automatically generated sitemap.xml
- **Open Graph**: Social media sharing optimization
- **Fast Loading**: Optimized for Core Web Vitals

## 🌐 **Internationalization**

Ready for multiple languages:
```typescript
// In docusaurus.config.ts
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr', 'zh'], // Add languages as needed
}
```

## 📱 **Progressive Web App**

The documentation works as a PWA:
- **Offline Support**: Cache important pages
- **App-like Experience**: Install on mobile devices
- **Fast Loading**: Service worker caching
- **Push Notifications**: (Optional) Update notifications

## 🐛 **Troubleshooting**

### **Common Issues**

**Build Fails**
```bash
# Clear cache and reinstall
npm run clear
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Styling Issues**
```bash
# Check CSS compilation
npm run start
# Open browser dev tools to inspect styles
```

**Link Errors**
```bash
# Check for broken links
npm run build
# Look for broken link warnings in output
```

### **Getting Help**
- **Documentation Issues**: Open GitHub issue
- **Docusaurus Help**: Check [Docusaurus documentation](https://docusaurus.io/)
- **Technical Support**: Contact the Eagle team

## 📜 **License**

This documentation is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

Built with amazing open-source projects:
- **[Docusaurus](https://docusaurus.io/)**: Documentation framework
- **[LayerZero](https://layerzero.network/)**: Omnichain infrastructure
- **[Mermaid](https://mermaid-js.github.io/)**: Diagram generation
- **[Prism](https://prismjs.com/)**: Syntax highlighting

---

**📚 Documentation for the future of omnichain DeFi! Built with ❤️ by the Eagle team.**

