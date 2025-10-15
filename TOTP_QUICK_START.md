# Quick Start: Two-Factor Authentication Setup

## ✅ TOTP Integration Complete!

Your Payload CMS template now includes two-factor authentication (TOTP) for enhanced security.

---

## 🚀 What Was Added

### 1. Package Installed
```bash
npm install payload-totp
```

### 2. Plugin Configured
The TOTP plugin is now active in `src/payload.config.ts` for the `users` collection.

### 3. Documentation Created
- **Full Guide**: See `TOTP_INTEGRATION.md` for complete documentation
- **This Guide**: Quick reference for getting started

---

## 📱 For Users: How to Enable 2FA

### Step 1: Access Your Account
1. Log in to `/admin`
2. Click your profile → "Account"

### Step 2: Setup Authenticator
1. Scroll to "Authenticator app" section
2. Click "Setup" button
3. Install an authenticator app (if needed):
   - **Google Authenticator**
   - **Microsoft Authenticator**  
   - **Authy**

### Step 3: Scan QR Code
1. Open your authenticator app
2. Scan the QR code shown on screen
3. Enter the 6-digit code to verify

### Step 4: Done!
From now on, you'll need:
- Your password
- A code from your authenticator app

---

## ⚙️ For Developers: Configuration Options

### Optional: Force TOTP Setup

Uncomment in `payload.config.ts`:

```typescript
payloadTotp({
  collection: 'users',
  forceSetup: true,  // Force all users to set up TOTP
})
```

Or use environment variable:
```env
# .env.local
TOTP_FORCE_SETUP=true
```

### Optional: Customize Branding

```typescript
payloadTotp({
  collection: 'users',
  totp: {
    issuer: 'Your Company Name',  // Shows in authenticator apps
    digits: 6,
    period: 30,
  },
})
```

### Optional: Disable in Development

```typescript
payloadTotp({
  collection: 'users',
  disabled: process.env.NODE_ENV === 'development',
})
```

---

## 🔒 Security Benefits

- ✅ Protects against password theft
- ✅ Prevents unauthorized access
- ✅ Complies with security best practices
- ✅ Industry-standard implementation
- ✅ Works offline (TOTP codes don't need internet)

---

## 📖 Features Available

### In Admin Dashboard
- Setup page with QR code
- Manual secret key entry option
- Remove/disable TOTP option
- Visual status indicator

### For API Users
- API endpoints for setup, verify, and remove
- Access control integration
- API key authentication still works

### Customization
- Force setup for all users
- Custom issuer name
- Adjustable code length
- Configurable time period
- White background QR codes for dark mode

---

## 🎯 Next Steps

1. **Test It Out**
   ```bash
   npm run dev
   ```
   - Log in to `/admin`
   - Set up TOTP from your account page

2. **Configure for Production**
   - Decide if you want `forceSetup: true`
   - Set custom issuer name
   - Update user documentation

3. **Train Your Users**
   - Share the user guide section from `TOTP_INTEGRATION.md`
   - Prepare help documentation
   - Consider creating video tutorials

---

## 🆘 Troubleshooting

### "Incorrect code" Error
- Check device clock is synchronized
- Wait for next code (refreshes every 30 seconds)
- Verify you're using the correct account

### Can't See Setup Button
- Check if TOTP is already configured
- Verify `forceSetup` setting
- Clear browser cache

### Need to Disable TOTP
- Users can remove it from account settings
- Admins can access database directly if needed
- Consider implementing backup codes

---

## 📚 Resources

- **Full Documentation**: `TOTP_INTEGRATION.md`
- **Plugin GitHub**: https://github.com/GeorgeHulpoi/payload-totp
- **Payload Docs**: https://payloadcms.com/docs

---

## 🎉 Benefits for Your Customers

When you deploy this template for customers, they get:

1. **Enterprise Security** - Bank-level two-factor authentication
2. **Easy Setup** - QR code scanning in seconds
3. **Multi-language Support** - Works in 30+ languages
4. **Mobile App Support** - Works with all major authenticator apps
5. **Optional or Mandatory** - You control the setup requirement

---

## 💡 Recommended Settings

### For High-Security Applications
```typescript
payloadTotp({
  collection: 'users',
  forceSetup: true,  // Require 2FA for everyone
  totp: {
    issuer: 'Your Company',
    algorithm: 'SHA256',  // Stronger than default SHA1
  },
})
```

### For User-Friendly Applications
```typescript
payloadTotp({
  collection: 'users',
  forceSetup: false,  // Optional 2FA
  forceWhiteBackgroundOnQrCode: true,  // Better dark mode support
})
```

---

## ✨ Everything is Ready!

The TOTP plugin is fully integrated and ready to use. No additional setup required!

Start your dev server and test it:
```bash
npm run dev
```

Navigate to http://localhost:3000/admin and try setting up 2FA from your account page.
