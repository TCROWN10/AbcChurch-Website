# All Believers Church Website

This is a [Next.js](https://nextjs.org) church website with authentication, donations, and content management features.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── donations/     # Donation management
│   │   ├── stripe/        # Stripe integration
│   │   └── subscriptions/ # Subscription management
│   ├── connect/           # Connect page
│   ├── devotional/        # Devotional content
│   ├── donate/            # Donation pages
│   ├── home/              # Home page
│   ├── message/           # Message page
│   ├── sermon/            # Sermon content
│   └── signin/            # Authentication pages
├── components/            # Reusable React components
│   ├── layout/           # Layout components (Navbar, Footer, etc.)
│   ├── sections/         # Page sections (Hero, About, etc.)
│   └── ui/               # UI components (Cards, Grids, etc.)
├── lib/                  # Utility functions and configurations
│   ├── auth/            # Authentication logic
│   ├── database/        # Database operations
│   ├── services/        # Business logic services
│   └── stripe/          # Stripe payment integration
└── types/               # TypeScript type definitions

public/
├── images/              # Static images
│   ├── backgrounds/     # Background images
│   ├── content/         # Content images
│   ├── icons/           # Icon files
│   └── logos/           # Logo files
└── manifest.json        # PWA manifest

data/
└── databases/           # SQLite database files

tests/
├── integration/         # Integration tests
└── unit/               # Unit tests
```

## Features

- **Authentication**: User registration, login, password reset
- **Donations**: Stripe integration for one-time and recurring donations
- **Content Management**: Sermons, devotionals, and church information
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database**: SQLite for local development
- **Testing**: Unit and integration tests

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### Required Variables

- **BETTER_AUTH_SECRET**: Secret key for encrypting auth tokens (generate with: `openssl rand -base64 32`)
- **STRIPE_PUBLISHABLE_KEY**: Your Stripe publishable key
- **STRIPE_SECRET_KEY**: Your Stripe secret key
- **STRIPE_WEBHOOK_SECRET**: Your Stripe webhook secret

### Optional Variables

- **NEXT_PUBLIC_APP_URL**: Your app URL (default: http://localhost:3000)
- **ALLOWED_ORIGINS**: Comma-separated list of allowed origins
- **BETTER_AUTH_DB_PATH**: Path to auth database (default: ./data/auth.db)
- **GOOGLE_CLIENT_ID**: Google OAuth client ID
- **GOOGLE_CLIENT_SECRET**: Google OAuth client secret

Notes:
- In production, cookies are set secure with SameSite=Lax via the client; ensure HTTPS.
- Sign-out is POST /api/auth/sign-out. A back-compat alias POST /api/auth/signout is provided.
- The SQLite file is created in ./data/auth.db by default; ensure the process has write permissions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

### Local Development
1. Set up environment variables (see Environment Variables section above)
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Start Stripe webhook listener: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Production Deployment

**📖 Comprehensive Guides:**
- **[STRIPE_SETUP.md](./STRIPE_SETUP.md)** - Complete guide to setting up Stripe for donations
- **[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)** - Detailed production deployment guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Quick checklist for going live

**Quick Deploy to Vercel:**
1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Add environment variables (use **LIVE** Stripe keys for production)
4. Configure production webhooks in Stripe Dashboard
5. Deploy!

Check out the [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for detailed step-by-step instructions.
