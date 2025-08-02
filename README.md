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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
