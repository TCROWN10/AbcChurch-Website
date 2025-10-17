# 🚀 Quick Start: Make Donations Work LIVE

## TL;DR - The Simple Version

### What You Have Now:
✅ Working donations locally with test cards  
✅ Test Stripe keys configured  
✅ Local webhook forwarding  

### What You Need for Live Donations:
1. **Live Stripe Keys** (instead of test keys)
2. **Deploy to hosting** (Vercel recommended)
3. **Production webhooks** (instead of local CLI)
4. **Real domain** (optional but recommended)

---

## The 5-Step Process

### Step 1: Activate Stripe (1-2 days)
```
1. Go to https://dashboard.stripe.com
2. Switch to LIVE MODE (top-right toggle)
3. Complete activation checklist
4. Get your live keys:
   - pk_live_xxxxx (Publishable Key)
   - sk_live_xxxxx (Secret Key)
```

### Step 2: Push to GitHub (5 minutes)
```bash
git init
git add .
git commit -m "Church website ready for deployment"
# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 3: Deploy to Vercel (10 minutes)
```
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy"
```

### Step 4: Add Environment Variables (10 minutes)
In Vercel → Settings → Environment Variables:
```bash
BETTER_AUTH_SECRET=<generate new: openssl rand -base64 32>
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
ALLOWED_ORIGINS=https://your-project.vercel.app
```
Then: Redeploy

### Step 5: Setup Production Webhooks (10 minutes)
```
1. Stripe Dashboard (LIVE MODE) → Developers → Webhooks
2. Add endpoint: https://your-project.vercel.app/api/stripe/webhook
3. Select all payment/subscription events
4. Copy webhook secret (whsec_xxx)
5. Add to Vercel: STRIPE_WEBHOOK_SECRET=whsec_xxx
6. Redeploy
```

---

## Test It!

Visit: `https://your-project.vercel.app/donate`

⚠️ **Use real card, real money!**
- Test with small amount ($0.50)
- You can refund in Stripe Dashboard

---

## Full Documentation

- 📖 **Detailed Guide:** [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
- ✅ **Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- 🔧 **Stripe Setup:** [STRIPE_SETUP.md](./STRIPE_SETUP.md)

---

## Key Differences: Local vs Production

| Aspect | Local (Now) | Production (Live) |
|--------|-------------|-------------------|
| **Keys** | `pk_test_...` / `sk_test_...` | `pk_live_...` / `sk_live_...` |
| **Webhooks** | Stripe CLI (`stripe listen`) | Stripe Dashboard webhook |
| **Cards** | Test cards (4242...) | Real credit cards |
| **Money** | Fake / Test mode | Real money processed |
| **URL** | `localhost:3000` | `yourdomain.com` |
| **Server** | Your computer | Vercel/Hosting |

---

## Need Help?

1. **Read the guides** - Very detailed instructions in the docs above
2. **Check Vercel logs** - See what errors occur
3. **Check Stripe logs** - See webhook delivery status
4. **Test in Test Mode first** - Before switching to Live

---

## Common Mistakes to Avoid

❌ Using test keys in production  
❌ Forgetting to add webhook secret  
❌ Not updating NEXT_PUBLIC_APP_URL  
❌ Testing with production keys locally  
❌ Committing .env to Git  

✅ Use test keys locally, live keys in production  
✅ Different secrets for each environment  
✅ Webhooks configured correctly  
✅ All environment variables set in Vercel  

---

**Ready?** Start with Step 1 above, or open [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for a printable checklist!

