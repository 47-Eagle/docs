# 🚀 Deployment Guide for docs.47eagle.com

## Current Status
The repository is ready for deployment with:
- ✅ Beautiful 0-100% loading screen
- ✅ All tunnel animations removed from docs
- ✅ Proper redirects configured (`/` → `/user`)
- ✅ Cache busting implemented
- ✅ Multiple documentation sections (users, dev, investor, partner, team)
- ✅ Konami Code easter egg
- ✅ Google OAuth integration
- ✅ Enhanced contrast for light/dark modes

## Deployment Options

### Option 1: Netlify (Recommended) ⭐

1. **Connect Repository**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select the `47-Eagle/docs` repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: build
   ```

3. **Environment Variables** (if needed)
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `ALLOWED_DOMAIN`: 47eagle.com

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy
   - They have more memory and better build optimization than local WSL

5. **Custom Domain**
   - Go to "Domain settings"
   - Add custom domain: `docs.47eagle.com`
   - Follow Netlify's DNS instructions

### Option 2: Vercel

1. **Connect Repository**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import from GitHub: `47-Eagle/docs`

2. **Build Settings**
   ```
   Framework Preset: Docusaurus 2
   Build Command: npm run build
   Output Directory: build
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel handles everything automatically

4. **Custom Domain**
   - Add domain: `docs.47eagle.com`
   - Follow Vercel's DNS instructions

### Option 3: GitHub Pages

1. **Update Repository Settings**
   - Go to repository Settings → Pages
   - Source: GitHub Actions

2. **Create `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy Docusaurus

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./build
   ```

3. **Custom Domain**
   - Add `CNAME` file with `docs.47eagle.com`
   - Configure DNS to point to GitHub Pages

## Local Build (If You Have More RAM)

If you want to build locally with more memory:

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=8192"

# Or on Windows
set NODE_OPTIONS=--max-old-space-size=8192

# Then build
npm run build
```

## Quick Deploy Command

```bash
# Push to GitHub
git push origin main

# Netlify/Vercel will auto-deploy from main branch
```

## Post-Deployment

After deployment:
1. Visit `https://docs.47eagle.com`
2. You should see the loading screen (0-100%)
3. Then redirected to `/user`
4. Try the Konami Code easter egg: ↑↑↓↓←→←→BA
5. Clear cache page available at: `/clear-cache.html`

## Troubleshooting

### If you see a GitHub README:
- The site isn't deployed yet
- Deploy using one of the options above
- DNS may take time to propagate (up to 48 hours)

### If you see the old tunnel:
- Visit `/clear-cache.html` to clear browser cache
- Or hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Build fails locally:
- This is normal on WSL with limited RAM
- Use Netlify/Vercel for building (they have 8GB+ RAM for builds)

## Files Structure

```
eagle-docs-clean/
├── docs/
│   ├── users/       → /user route
│   ├── dev/         → /dev route
│   ├── investor/    → /investor route
│   ├── partner/     → /partner route
│   └── team/        → /team route
├── static/
│   ├── _redirects   → / redirects to /user
│   ├── _headers     → Cache control
│   └── clear-cache.html
├── src/
│   └── theme/
│       ├── Root.tsx → Loading screen
│       └── loading-screen.css
└── intro/           → Separate Next.js app for 47eagle.com
```

## Need Help?

- Netlify Docs: https://docs.netlify.com/
- Vercel Docs: https://vercel.com/docs
- Docusaurus Docs: https://docusaurus.io/docs/deployment

