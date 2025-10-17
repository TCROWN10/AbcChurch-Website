# Production Deployment Guide - Live Donations

This guide walks you through deploying your church website to production with live Stripe donations.

## Prerequisites Checklist

Before going live, ensure you have:
- ✅ Tested donations locally with test cards
- ✅ Verified all features work correctly
- ✅ A domain name for your website
- ✅ Completed Stripe account activation
- ✅ A hosting platform account (Vercel, Netlify, etc.)

---

## Part 1: Activate Your Stripe Account for Live Payments

### Step 1: Complete Stripe Activation

1. **Go to Stripe Dashboard:** https://dashboard.stripe.com
2. **Switch to Live Mode** (toggle in top-right corner)
3. **Complete the activation checklist:**
   - Provide business information
   - Add business details (legal name, address, tax ID)
   - Verify your identity (may require photo ID)
   - Add bank account for payouts
   - Set up branding (optional but recommended)

4. **Wait for approval** (usually instant, but can take 1-2 business days)

### Step 2: Get Your Live API Keys

Once activated:

1. Stay in **Live Mode** (not Test Mode)
2. Go to **Developers → API keys**: https://dashboard.stripe.com/apikeys
3. Copy these keys (you'll need them later):
   - **Publishable key** (starts with `pk_live_...`)
   - **Secret key** (starts with `sk_live_...`) - Click "Reveal live key"

⚠️ **CRITICAL:** Keep these keys **PRIVATE**. Never commit them to Git or share them publicly!

---

## Part 2: Choose Your Hosting Platform

### Recommended: Vercel (Easiest for Next.js)

**Why Vercel?**
- Built by the creators of Next.js
- Zero-config deployments
- Automatic HTTPS
- Free tier available
- Excellent performance

**Other Options:**
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

This guide uses **Vercel** as the primary example.

---

## Part 3: Deploy to Vercel

### Step 1: Push Your Code to GitHub

If you haven't already:

```bash
# Initialize git (if not already done)
cd /Users/MAC/Downloads/AbcChurch-Website-main
git init

# Create .gitignore (if not exists)
cat >> .gitignore << 'EOF'
.env
.env.local
.env*.local
node_modules
.next
EOF

# Commit your code
git add .
git commit -m "Initial commit - Church website with donations"

# Create GitHub repository and push
# (Follow GitHub's instructions for creating a new repo)
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel:** https://vercel.com
2. **Sign up/Login** (use GitHub account)
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure the project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Click "Deploy"**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Step 3: Add Environment Variables to Vercel

This is **CRITICAL** - your live site needs the production environment variables!

1. **Go to your project on Vercel**
2. **Click "Settings" → "Environment Variables"**
3. **Add these variables ONE BY ONE:**

```bash
# Better Auth Secret (generate a NEW one for production!)
BETTER_AUTH_SECRET=<run: openssl rand -base64 32>

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Stripe LIVE Keys (from Part 1, Step 2)
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=<we'll get this in Part 4>

# Database Path (optional)
BETTER_AUTH_DB_PATH=/tmp/auth.db

# Google OAuth (optional)
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. **Set environment:** Select **Production, Preview, and Development**
5. **Click "Save"**

⚠️ **Important Notes:**
- Generate a **NEW** `BETTER_AUTH_SECRET` for production (don't reuse dev secret)
- Use your **LIVE** Stripe keys (`pk_live_...` and `sk_live_...`)
- Replace `yourdomain.com` with your actual domain
- We'll add `STRIPE_WEBHOOK_SECRET` after setting up webhooks (next part)

---

## Part 4: Set Up Production Webhooks

Your live site needs to receive webhook events from Stripe when donations occur.

### Step 1: Get Your Production URL

After deploying to Vercel, you'll have a URL like:
- `https://your-project.vercel.app` (Vercel subdomain)
- Or your custom domain: `https://yourdomain.com`

### Step 2: Create Production Webhook in Stripe

1. **Go to Stripe Dashboard:** https://dashboard.stripe.com
2. **Make sure you're in LIVE MODE** (toggle in top-right)
3. **Go to Developers → Webhooks:** https://dashboard.stripe.com/webhooks
4. **Click "Add endpoint"**
5. **Configure webhook:**
   - **Endpoint URL:** `https://yourdomain.com/api/stripe/webhook`
   - **Description:** Production donation webhooks
   - **Version:** Latest API version

6. **Select events to listen for:**
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
   - ✅ `checkout.session.completed`
   - ✅ `checkout.session.expired`

7. **Click "Add endpoint"**

### Step 3: Get Webhook Signing Secret

1. **Click on your newly created webhook endpoint**
2. **Copy the "Signing secret"** (starts with `whsec_...`)
3. **Go back to Vercel:**
   - Settings → Environment Variables
   - Add/Update: `STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx`
   - Save and redeploy

### Step 4: Test the Webhook

1. **In Stripe Dashboard**, go to your webhook endpoint
2. **Click "Send test webhook"**
3. **Select an event type** (e.g., `payment_intent.succeeded`)
4. **Click "Send test webhook"**
5. **Check the response** - should show success (200 OK)

---

## Part 5: Configure Custom Domain (Optional)

### On Vercel:

1. **Go to Project Settings → Domains**
2. **Add your domain:** `yourdomain.com`
3. **Follow DNS configuration instructions**
4. **Add DNS records at your domain registrar:**
   - Type: `A` or `CNAME`
   - Name: `@` or `www`
   - Value: (provided by Vercel)

5. **Wait for DNS propagation** (can take 24-48 hours)

### Update Environment Variables:

Once your domain is active, update:
```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Then redeploy.

---

## Part 6: Test Live Donations

⚠️ **IMPORTANT:** You'll be processing **REAL MONEY** now!

### Safe Testing Approach:

1. **Test with small amounts first** ($0.50 - $1.00)
2. **Use your own real credit card**
3. **Make a test donation:**
   - Go to: `https://yourdomain.com/donate`
   - Enter a small amount
   - Use your real card
   - Complete the donation

4. **Verify the payment:**
   - Check Stripe Dashboard → Payments (Live Mode)
   - Check your email for confirmation
   - Verify webhook was received (Webhooks → Events)

5. **Issue a refund** (optional):
   - In Stripe Dashboard, find the payment
   - Click "Refund" to get your money back

### What to Check:

✅ Donation form loads correctly  
✅ Payment processes successfully  
✅ Success page displays  
✅ Stripe Dashboard shows payment  
✅ Webhooks are received  
✅ No errors in Vercel logs  

---

## Part 7: Monitor and Maintain

### Monitoring:

1. **Vercel Logs:**
   - Project → Deployments → Click deployment → "Functions" tab
   - Monitor for errors

2. **Stripe Dashboard:**
   - Check payments daily
   - Monitor failed payments
   - Watch webhook delivery

3. **Set up Stripe Email Notifications:**
   - Settings → Notifications
   - Enable alerts for failed payments, disputes, etc.

### Regular Tasks:

- **Weekly:** Check Stripe Dashboard for donations
- **Monthly:** Review failed payments and disputes
- **Quarterly:** Review and update Stripe keys if needed
- **Annually:** Verify Stripe account information is up to date

---

## Part 8: Security Best Practices

✅ **Never commit `.env` files to Git**  
✅ **Use different secrets for dev/staging/production**  
✅ **Rotate API keys periodically**  
✅ **Enable Stripe fraud protection**  
✅ **Keep dependencies updated:** `npm audit fix`  
✅ **Monitor Vercel security advisories**  
✅ **Use HTTPS only** (automatic with Vercel)  
✅ **Review Stripe logs regularly**  

---

## Troubleshooting

### Issue: Donations fail in production but work locally

**Solution:**
- Check Vercel logs for errors
- Verify all environment variables are set
- Ensure webhook secret is correct
- Check Stripe Dashboard → Logs for errors

### Issue: Webhooks not being received

**Solution:**
- Verify webhook URL is correct: `https://yourdomain.com/api/stripe/webhook`
- Check webhook is in LIVE mode (not test mode)
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- Check Vercel function logs

### Issue: "Unauthorized" or authentication errors

**Solution:**
- Verify `BETTER_AUTH_SECRET` is set in production
- Check `ALLOWED_ORIGINS` includes your domain
- Ensure `NEXT_PUBLIC_APP_URL` is correct

### Issue: Database errors

**Solution:**
- For SQLite in production, consider upgrading to PostgreSQL or MySQL
- Vercel's filesystem is ephemeral - data may be lost between deployments
- Consider using Vercel Postgres or external database

---

## Production Database Considerations

⚠️ **Important:** SQLite on Vercel is **not persistent**!

Your current setup uses SQLite (`auth.db`), which works for development but has limitations in production:
- File system is read-only in Vercel functions
- Data can be lost between deployments
- Not suitable for multi-region deployments

### Recommended: Upgrade to Vercel Postgres

1. **In Vercel Dashboard:**
   - Go to Storage → Create Database
   - Choose "Postgres"
   - Follow setup instructions

2. **Update Better Auth configuration** to use Postgres
3. **Run migrations** to create auth tables

**Alternative:** Use an external database service (Supabase, PlanetScale, Railway, etc.)

---

## Quick Reference: Environment Variables

### Development (.env file):
```bash
BETTER_AUTH_SECRET=<dev_secret>
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
```

### Production (Vercel Environment Variables):
```bash
BETTER_AUTH_SECRET=<NEW_production_secret>
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Stripe Documentation:** https://stripe.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Better Auth Documentation:** https://better-auth.com/docs

---

## Checklist: Pre-Launch

Before making your site public:

- [ ] Stripe account fully activated
- [ ] Live Stripe keys obtained and added to Vercel
- [ ] Production webhooks configured and tested
- [ ] Custom domain configured (if applicable)
- [ ] Test donation completed successfully
- [ ] All environment variables set in production
- [ ] Vercel deployment successful
- [ ] HTTPS working correctly
- [ ] No errors in Vercel logs
- [ ] Database strategy decided (SQLite limitations noted)
- [ ] Email notifications configured in Stripe
- [ ] Team trained on Stripe Dashboard
- [ ] Refund/dispute process documented

---

**Congratulations!** Once you complete these steps, your church website will be live and accepting real donations! 🎉

If you run into any issues during deployment, refer to the Troubleshooting section or reach out for help.

