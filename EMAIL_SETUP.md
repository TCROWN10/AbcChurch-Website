# Email Notifications Setup Guide

Your website will automatically send emails for:
1. ✉️ **Prayer Requests** → Sent to church email
2. 👤 **New User Sign-ups** → Sent to church email  
3. ✅ **Prayer Request Confirmations** → Sent to person who submitted

---

## Quick Setup (5-10 minutes)

### Step 1: Choose Your Email Service

You need an SMTP email service. **Best options:**

| Service | Cost | Best For | Setup Difficulty |
|---------|------|----------|------------------|
| **Gmail** (Recommended) | Free | Small churches | ⭐ Easy |
| **Outlook/Hotmail** | Free | Microsoft users | ⭐ Easy |
| **SendGrid** | Free (100/day) | Larger volume | ⭐⭐ Medium |
| **Resend** | Free (3,000/month) | Modern setup | ⭐⭐ Medium |

---

## Option 1: Gmail (Recommended for Small Churches)

### Step 1: Enable App Passwords in Gmail

1. **Go to your Google Account**: https://myaccount.google.com
2. **Click "Security"** (left sidebar)
3. **Enable 2-Factor Authentication** (required for app passwords)
   - Click "2-Step Verification"
   - Follow the setup process
4. **Create App Password**:
   - Go back to Security
   - Click "2-Step Verification" → "App passwords" (at the bottom)
   - Select "Mail" and "Other (Custom name)"
   - Enter: "Church Website"
   - Click "Generate"
   - **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 2: Add to Your .env File

Open your `.env` file and add:

```bash
# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-church-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
FROM_EMAIL=your-church-email@gmail.com

# Notification Emails
PRAYER_REQUEST_NOTIFICATION_EMAIL=your-church-email@gmail.com
NEW_USER_NOTIFICATION_EMAIL=your-church-email@gmail.com
```

**Replace:**
- `your-church-email@gmail.com` with your actual Gmail address
- `abcd efgh ijkl mnop` with the app password you generated

### Step 3: Add to Vercel (Production)

1. Go to your Vercel project
2. Click **Settings → Environment Variables**
3. Add these variables (use the same values from your `.env`):
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `FROM_EMAIL`
   - `PRAYER_REQUEST_NOTIFICATION_EMAIL`
   - `NEW_USER_NOTIFICATION_EMAIL`

4. **Important**: Set environment to **Production, Preview, and Development**
5. Click "Save"
6. **Redeploy** your site

---

## Option 2: Outlook/Hotmail

### Step 1: Enable App Password

1. Go to: https://account.microsoft.com/security
2. Click "Advanced security options"
3. Under "App passwords", click "Create a new app password"
4. Copy the generated password

### Step 2: Add to .env File

```bash
# Email Configuration (Outlook)
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-church-email@outlook.com
SMTP_PASS=your-app-password-here
FROM_EMAIL=your-church-email@outlook.com

# Notification Emails
PRAYER_REQUEST_NOTIFICATION_EMAIL=your-church-email@outlook.com
NEW_USER_NOTIFICATION_EMAIL=your-church-email@outlook.com
```

### Step 3: Add to Vercel (same as Gmail Option 1, Step 3)

---

## Option 3: SendGrid (For High Volume)

### Step 1: Create SendGrid Account

1. Sign up at: https://sendgrid.com
2. Verify your email
3. Create an API key:
   - Settings → API Keys
   - Click "Create API Key"
   - Name: "Church Website"
   - Select "Full Access"
   - Copy the API key

### Step 2: Add to .env File

```bash
# Email Configuration (SendGrid)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key-here
FROM_EMAIL=noreply@yourdomain.com

# Notification Emails
PRAYER_REQUEST_NOTIFICATION_EMAIL=your-church-email@gmail.com
NEW_USER_NOTIFICATION_EMAIL=your-church-email@gmail.com
```

### Step 3: Verify Domain (Optional but Recommended)

1. In SendGrid: Settings → Sender Authentication
2. Follow domain verification process
3. This prevents emails from going to spam

### Step 4: Add to Vercel (same as Gmail Option 1, Step 3)

---

## Testing Your Email Setup

### Test Locally:

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Submit a prayer request**:
   - Go to: http://localhost:3000
   - Find the prayer request form
   - Fill it out and submit

3. **Check your church email**:
   - You should receive a notification email
   - The person who submitted should get a confirmation

### Test on Production:

After deploying to Vercel:
1. Go to your live site
2. Submit a test prayer request
3. Create a test account
4. Check your church email for notifications

---

## What Emails Are Sent?

### 1. Prayer Request Notification (To Church)
**Trigger:** When someone submits a prayer request  
**Sent to:** `PRAYER_REQUEST_NOTIFICATION_EMAIL`  
**Contains:**
- Person's name and email
- Prayer request subject
- Full prayer request text
- Timestamp

### 2. Prayer Request Confirmation (To User)
**Trigger:** When someone submits a prayer request  
**Sent to:** Person who submitted the request  
**Contains:**
- Confirmation that request was received
- Encouraging message
- Bible verse

### 3. New User Notification (To Church)
**Trigger:** When someone creates an account  
**Sent to:** `NEW_USER_NOTIFICATION_EMAIL`  
**Contains:**
- User's name and email
- Registration timestamp
- Suggestion to welcome them

---

## Troubleshooting

### "Failed to send email" Error

**Problem:** SMTP credentials are wrong or not set

**Solutions:**
1. Check that all environment variables are set correctly
2. For Gmail: Make sure you're using an **App Password**, not your regular password
3. For Gmail: Make sure 2-Factor Authentication is enabled
4. Check for typos in email addresses
5. Make sure `SMTP_PORT` is a number (587 or 465)

### Emails Going to Spam

**Solutions:**
1. **Use a verified domain** (SendGrid/Resend)
2. **Add SPF/DKIM records** to your domain DNS
3. **Use your own domain** instead of Gmail (for production)
4. **Ask recipients to mark as "Not Spam"**

### Emails Not Arriving

**Check:**
1. ✅ Vercel environment variables are set
2. ✅ Environment variables are in Production environment
3. ✅ Site has been redeployed after adding variables
4. ✅ Check spam folder
5. ✅ Check Vercel function logs for errors

### "Connection timeout" Error

**Solutions:**
1. Try port `465` instead of `587`
2. Check firewall settings
3. Try a different email service

---

## Environment Variables Reference

### Required Variables:

```bash
SMTP_HOST=smtp.gmail.com           # Your email service SMTP server
SMTP_PORT=587                      # Usually 587 or 465
SMTP_USER=your-email@gmail.com     # Your email address
SMTP_PASS=your-app-password        # App password (not regular password!)
FROM_EMAIL=your-email@gmail.com    # Email that appears in "From" field
```

### Notification Recipients:

```bash
# Where to send prayer request notifications
PRAYER_REQUEST_NOTIFICATION_EMAIL=church-admin@gmail.com

# Where to send new user signup notifications (optional - defaults to prayer email)
NEW_USER_NOTIFICATION_EMAIL=church-admin@gmail.com
```

**Note:** You can use the same email for both notification types, or different emails for different staff members.

---

## Security Best Practices

### ✅ DO:
- Use app passwords (not your actual password)
- Keep `.env` file in `.gitignore` (already configured)
- Use different passwords for dev/prod
- Rotate passwords periodically
- Use 2-Factor Authentication on your email account

### ❌ DON'T:
- Commit `.env` to Git
- Share SMTP credentials publicly
- Use your personal email password
- Hardcode credentials in code

---

## Production Checklist

Before going live:

- [ ] SMTP credentials configured in Vercel
- [ ] Test email sent successfully
- [ ] Prayer request notification received
- [ ] New user notification received
- [ ] Confirmation emails working
- [ ] Emails not going to spam
- [ ] Church email is being monitored
- [ ] Spam folder checked regularly

---

## Need Help?

### Gmail Issues:
- https://support.google.com/accounts/answer/185833
- Make sure 2FA is enabled first

### Outlook Issues:
- https://support.microsoft.com/account-billing

### SendGrid Issues:
- https://docs.sendgrid.com

---

## Current Status

After setup, your site will automatically:
- ✅ Send prayer requests to your church email
- ✅ Send confirmations to people who submit prayers
- ✅ Notify you when someone signs up
- ✅ All emails beautifully formatted with church branding

---

**Ready to set up?** Start with **Option 1 (Gmail)** - it's the easiest! 🚀

