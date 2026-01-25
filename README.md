# Dan Computers - Computer & CCTV Solutions

A modern Next.js e-commerce website for Dan Computers, offering computers, CCTV systems, and accessories in Likoni-Ferry, Mombasa.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Project Structure

```
dan-computers/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── products/          # Products listing & detail pages
│   ├── services/          # Services page
│   └── contact/           # Contact page
├── components/            # Reusable React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── ...               # Custom components
├── lib/                   # Utility functions & data
│   ├── products.ts       # Product data
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   └── images/           # Product images
└── styles/               # Global styles

```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 🌐 Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub** (Already done ✅)
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Build Settings**:
   - Framework Preset: **Next.js**
   - Build Command: `pnpm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `pnpm install` (auto-detected)

4. **Deploy**:
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📝 Environment Variables

For local development, create a `.env.local` file (see `.env.example`).

For Vercel deployment:

1. Go to Project Settings > Environment Variables
2. Add your variables
3. Redeploy

## 🎨 Customization

### Update Product Data

Edit `lib/products.ts` to add/modify products.

### Update Contact Information

Update phone numbers and WhatsApp links in:

- `components/navbar.tsx`
- `components/footer.tsx`
- `components/floating-cta.tsx`
- Product detail pages

### Change Brand Colors

Edit `app/globals.css` CSS variables:

- `--primary`: Main brand color
- `--accent`: Secondary accent color

## 📊 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Product catalog with filtering & search
- ✅ Product detail pages
- ✅ WhatsApp integration for inquiries
- ✅ Smooth animations & transitions
- ✅ SEO optimized
- ✅ Fast page loads (Next.js optimizations)
- ✅ Vercel Analytics integration

## 🐛 Troubleshooting

### Build Errors

- Run `pnpm run build` locally to catch errors before deployment
- Check TypeScript errors with `pnpm run lint`

### Image Optimization

- Images are optimized automatically by Next.js
- Ensure images are in `public/images/` directory

## 📞 Contact

**Dan Computers**

- Location: Likoni-Ferry, Mombasa
- Phone: +254 702 060 171
- WhatsApp: +254 702 060 171

## 📄 License

© 2026 Dan Computers. All rights reserved.
