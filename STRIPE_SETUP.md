# Stripe Donation Setup Guide

This guide will help you set up Stripe to enable donation functionality in your church website.

## Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click **"Sign up"** (or **"Sign in"** if you already have an account)
3. Complete the registration process
4. You'll be redirected to the Stripe Dashboard

## Step 2: Get Your API Keys

### For Testing (Test Mode):

1. In the Stripe Dashboard, make sure you're in **Test Mode** (toggle in the top-right)
2. Go to **Developers → API keys** (https://dashboard.stripe.com/test/apikeys)
3. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`) - Safe to expose in frontend
   - **Secret key** (starts with `sk_test_...`) - Keep private! Click "Reveal test key"

4. Copy these values - you'll need them shortly

### For Production (Live Mode):

⚠️ Only switch to Live Mode after testing! You'll need to:
- Complete your Stripe account verification
- Provide business information
- Follow Stripe's activation checklist

## Step 3: Set Up Webhooks

Webhooks allow Stripe to notify your app about payment events (successful donations, failed payments, etc.)

### Option A: Local Development (Using Stripe CLI)

#### Install Stripe CLI:

**macOS:**
```bash
brew install stripe/stripe-cli/stripe
```

**Other platforms:** [Download from here](https://stripe.com/docs/stripe-cli)

#### Login to Stripe:
```bash
stripe login
```
This will open a browser to authorize the CLI.

#### Start webhook forwarding:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This command will output a webhook signing secret starting with `whsec_...`
**Copy this secret!** You'll need it for your `.env` file.

Keep this terminal running while developing.

### Option B: Production/Deployed Website

1. Go to **Developers → Webhooks** (https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter your endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `checkout.session.completed`
   - `checkout.session.expired`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_...`)

## Step 4: Update Your .env File

Open your `.env` file and replace the placeholder values:

```bash
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here
```

⚠️ **Important:**
- Never commit these keys to Git
- Keep your secret key private
- Use test keys for development
- Use live keys only in production

## Step 5: Test the Donation Flow

### Start your development server:
```bash
npm run dev
```

### If using Stripe CLI for webhooks (in another terminal):
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Test the donation page:
1. Open http://localhost:3000/donate
2. Fill in the donation form
3. Use Stripe test card numbers:
   - **Successful payment:** `4242 4242 4242 4242`
   - **Payment declined:** `4000 0000 0000 0002`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC (e.g., 123)
   - Use any zip code (e.g., 12345)

### Verify the payment:
1. Check the Stripe Dashboard → Payments
2. You should see the test donation
3. Check your terminal for webhook events

## Step 6: Going Live (When Ready)

1. **Switch to Live Mode** in Stripe Dashboard
2. **Complete Stripe account activation**
3. **Get your live API keys:**
   - Go to Developers → API keys (in Live Mode)
   - Copy the live keys (start with `pk_live_...` and `sk_live_...`)
4. **Set up production webhooks** (Option B above)
5. **Update your production .env file** with live keys
6. **Test with real cards** (small amounts first!)

## Common Test Cards

| Scenario | Card Number | Description |
|----------|-------------|-------------|
| Success | 4242 4242 4242 4242 | Payment succeeds |
| Decline | 4000 0000 0000 0002 | Card declined |
| Insufficient funds | 4000 0000 0000 9995 | Insufficient funds |
| Expired card | 4000 0000 0000 0069 | Expired card |
| 3D Secure | 4000 0025 0000 3155 | Requires authentication |

More test cards: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

## Troubleshooting

### "STRIPE_PUBLISHABLE_KEY environment variable is required"
- Make sure your `.env` file has actual values, not placeholders
- Restart your dev server after updating `.env`

### Webhooks not working
- Make sure `stripe listen` is running (for local dev)
- Check the webhook URL is correct
- Verify the webhook secret in `.env`

### Donations not recording
- Check browser console for errors
- Check server terminal for errors
- Verify webhook events are being received

## Need Help?

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Test Mode Guide](https://stripe.com/docs/testing)
- [Webhook Testing](https://stripe.com/docs/webhooks/test)

---

**Security Reminder:** 
- Never share your secret keys
- Never commit `.env` to Git
- Use test mode for development
- Only switch to live mode when ready for production

