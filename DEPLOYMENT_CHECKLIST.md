# 🚀 Quick Deployment Checklist

Use this checklist to deploy your church website to production with live donations.

---

## Phase 1: Stripe Activation (1-2 days)

- [ ] Login to Stripe Dashboard: https://dashboard.stripe.com
- [ ] Switch to **Live Mode** (toggle top-right)
- [ ] Complete activation checklist:
  - [ ] Business information submitted
  - [ ] Identity verified
  - [ ] Bank account added for payouts
  - [ ] Account approved
- [ ] Get Live API Keys (Developers → API keys):
  - [ ] Copy Publishable Key (`pk_live_...`)
  - [ ] Copy Secret Key (`sk_live_...`)
  - [ ] Save them securely (you'll need them later)

---

## Phase 2: Prepare Your Code (30 minutes)

- [ ] Test everything locally one more time
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Initialize Git repository (if not done):
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```
- [ ] Create GitHub repository
- [ ] Push code to GitHub:
  ```bash
  git remote add origin https://github.com/yourusername/your-repo.git
  git push -u origin main
  ```

---

## Phase 3: Deploy to Vercel (15 minutes)

- [ ] Go to Vercel: https://vercel.com
- [ ] Sign up/Login with GitHub
- [ ] Click "Add New Project"
- [ ] Import your GitHub repository
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Note your deployment URL: `https://your-project.vercel.app`

---

## Phase 4: Configure Environment Variables (10 minutes)

In Vercel Dashboard → Settings → Environment Variables, add:

### Required Variables:

- [ ] `BETTER_AUTH_SECRET`
  - Generate: `openssl rand -base64 32`
  - **Use a NEW secret** (different from development)

- [ ] `STRIPE_PUBLISHABLE_KEY`
  - Value: `pk_live_...` (from Phase 1)

- [ ] `STRIPE_SECRET_KEY`
  - Value: `sk_live_...` (from Phase 1)

- [ ] `NEXT_PUBLIC_APP_URL`
  - Value: `https://your-project.vercel.app` (or your custom domain)

- [ ] `ALLOWED_ORIGINS`
  - Value: `https://your-project.vercel.app` (or your domain)

### To Add Later:

- [ ] `STRIPE_WEBHOOK_SECRET` (will get this in Phase 5)

**After adding variables:** Redeploy by going to Deployments → ⋯ → Redeploy

---

## Phase 5: Setup Production Webhooks (10 minutes)

- [ ] In Stripe Dashboard (LIVE MODE):
  - [ ] Go to: Developers → Webhooks
  - [ ] Click "Add endpoint"
  - [ ] Endpoint URL: `https://your-project.vercel.app/api/stripe/webhook`
  - [ ] Select these events:
    - [ ] `payment_intent.succeeded`
    - [ ] `payment_intent.payment_failed`
    - [ ] `customer.subscription.created`
    - [ ] `customer.subscription.updated`
    - [ ] `customer.subscription.deleted`
    - [ ] `invoice.payment_succeeded`
    - [ ] `invoice.payment_failed`
    - [ ] `checkout.session.completed`
    - [ ] `checkout.session.expired`
  - [ ] Click "Add endpoint"
  - [ ] Copy the Signing Secret (`whsec_...`)

- [ ] Back in Vercel:
  - [ ] Settings → Environment Variables
  - [ ] Add `STRIPE_WEBHOOK_SECRET` with the value from above
  - [ ] Save and redeploy

---

## Phase 6: Test Production Donations (15 minutes)

⚠️ **You'll be using real money! Start with small amounts.**

- [ ] Visit your live site: `https://your-project.vercel.app/donate`
- [ ] Test with a small donation ($0.50 - $1.00):
  - [ ] Use your real credit card
  - [ ] Complete the donation
  - [ ] Verify success page appears
- [ ] Check Stripe Dashboard (Live Mode):
  - [ ] Payment appears in Payments section
  - [ ] Webhook event received in Webhooks → Events
- [ ] Check Vercel logs for any errors
- [ ] (Optional) Refund the test payment

---

## Phase 7: Custom Domain (Optional, 1-2 days)

- [ ] In Vercel: Settings → Domains
- [ ] Add your domain (e.g., `churchname.org`)
- [ ] Configure DNS at your domain registrar:
  - [ ] Add A or CNAME records (as instructed by Vercel)
  - [ ] Wait for DNS propagation (24-48 hours)
- [ ] Update environment variables:
  - [ ] `NEXT_PUBLIC_APP_URL=https://churchname.org`
  - [ ] `ALLOWED_ORIGINS=https://churchname.org,https://www.churchname.org`
- [ ] Redeploy
- [ ] Update Stripe webhook URL:
  - [ ] In Stripe Dashboard, edit webhook endpoint
  - [ ] Change URL to: `https://churchname.org/api/stripe/webhook`
  - [ ] Save

---

## Phase 8: Final Checks

- [ ] Visit your live site and test:
  - [ ] Homepage loads
  - [ ] Navigation works
  - [ ] All pages load correctly
  - [ ] Donation page works
  - [ ] Sign in/Sign up works
- [ ] Verify HTTPS is working (🔒 in browser)
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Review Vercel deployment logs

---

## Phase 9: Go Live! 🎉

- [ ] Announce your website to the church
- [ ] Share donation link on social media
- [ ] Add donation link to church bulletins
- [ ] Train staff on Stripe Dashboard
- [ ] Set up Stripe email notifications
- [ ] Document refund process for church admin

---

## Ongoing Maintenance

### Daily:
- [ ] Monitor Stripe Dashboard for donations

### Weekly:
- [ ] Check Vercel logs for errors
- [ ] Review failed payments in Stripe

### Monthly:
- [ ] Review donation analytics
- [ ] Check for npm package updates: `npm outdated`
- [ ] Verify backups (if using database)

### Quarterly:
- [ ] Test donation flow
- [ ] Review and update content
- [ ] Check security advisories: `npm audit`

---

## Emergency Contacts

- **Vercel Support:** https://vercel.com/support
- **Stripe Support:** https://support.stripe.com
- **Your Developer:** [Add contact info]

---

## Quick Commands

### Generate new secret:
```bash
openssl rand -base64 32
```

### Check site is live:
```bash
curl -I https://your-project.vercel.app
```

### View Vercel logs:
```bash
vercel logs [deployment-url]
```

---

**Current Status:** [ ] Not Started | [ ] In Progress | [ ] Completed

**Production URL:** ___________________________

**Deployment Date:** ___________________________

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

