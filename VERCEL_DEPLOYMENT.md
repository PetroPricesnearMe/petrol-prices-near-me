# Deploy to Vercel - Complete Guide

## Method 1: Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy from your project directory
```bash
vercel --prod
```

## Method 2: GitHub + Vercel Dashboard

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect settings from your `vercel.json`

## Troubleshooting Common Issues

### Issue 1: Build Failures
If your build fails, try these fixes:

1. **Update your build script in package.json:**
```json
{
  "scripts": {
    "build": "vite build --mode production",
    "preview": "vite preview"
  }
}
```

2. **Check your vite.config.mjs:**
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false, // Disable sourcemaps for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react']
        }
      }
    }
  },
  base: "/", // Ensure correct base path
});
```

### Issue 2: Routing Problems
Your `vercel.json` already has the correct rewrite rule:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Issue 3: Environment Variables
Add these in Vercel Dashboard > Settings > Environment Variables:
- `VITE_AIRTABLE_BASE_ID`
- `VITE_AIRTABLE_API_KEY`

### Issue 4: CSS/Styling Issues
Make sure Tailwind is properly configured:

1. **Check postcss.config.js:**
```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    'tailwindcss': {},
    'autoprefixer': {},
  }
}
```

2. **Verify tailwind.config.js content paths:**
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of config
}
```

## Quick Fix Commands

If you're having issues, try these commands in order:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build locally
npm run build
npm run preview

# Deploy to Vercel
vercel --prod
```

## Alternative: Manual Upload

If CLI doesn't work:

1. Run `npm run build` locally
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag and drop your `dist` folder
4. Vercel will deploy it instantly

## Common Vercel Settings

In your Vercel dashboard, ensure these settings:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node.js Version:** 18.x (recommended)

## Need Help?

If you're still having issues:
1. Check the Vercel deployment logs
2. Test your build locally first with `npm run build && npm run preview`
3. Make sure all dependencies are in package.json
4. Verify environment variables are set correctly

Your project is already well-configured for Vercel deployment!