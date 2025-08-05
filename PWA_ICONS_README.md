# PWA Icons Setup Guide

## Current Setup

The PWA configuration is currently using the existing `vite.svg` as a fallback icon. This works for development but you should add proper PWA icons for production.

## How to Add Proper PWA Icons

### Option 1: Generate Icons Online (Recommended)

1. Go to [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your app logo/icon (at least 512x512px recommended)
3. Generate the PWA icons
4. Download and place the generated icons in the `public/` folder

### Option 2: Create Icons Manually

Create the following icon files in the `public/` folder:

- `pwa-192x192.png` - 192x192 pixels
- `pwa-512x512.png` - 512x512 pixels

### Option 3: Use a Simple Icon Generator

You can use tools like:

- [Favicon.io](https://favicon.io/)
- [PWA Builder](https://www.pwabuilder.com/imageGenerator)

## Update Configuration

Once you have the icons, update `vite.config.ts`:

```typescript
icons: [
    {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
    },
    {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
    },
    {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
    },
],
```

## Current Fallback

The app currently uses `vite.svg` as a fallback icon, which works for development and testing.
