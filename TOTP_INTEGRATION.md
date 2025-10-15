# Two-Factor Authentication (TOTP) Integration Guide

## Overview
This Payload CMS template includes integrated two-factor authentication (TOTP - Time-based One-Time Password) via the `payload-totp` plugin. This provides an additional layer of security for user accounts by requiring a second form of authentication beyond just a password.

## What is TOTP?
TOTP (Time-based One-Time Password) is a common form of two-factor authentication (2FA). It generates temporary codes that expire every 30 seconds. Users scan a QR code with an authenticator app (like Google Authenticator, Authy, Microsoft Authenticator, etc.) and then use the generated codes to log in.

## Features
- ✅ **QR Code Setup** - Easy setup with QR code scanning
- ✅ **Manual Code Entry** - Option to manually enter the secret key
- ✅ **Account Dashboard Integration** - Built-in UI in user account settings
- ✅ **Optional or Forced Setup** - Can be optional or mandatory for users
- ✅ **Secure Access Control** - Automatically wraps collection/global access controls
- ✅ **Multi-language Support** - Supports 30+ languages out of the box

## How It Works

### For End Users (Dashboard Users)

1. **After Login**
   - Navigate to your account settings (click your profile in the admin panel)
   - Look for the "Authenticator app" field

2. **Setting Up TOTP**
   - Click the "Setup" button
   - You'll be redirected to the TOTP setup page
   - Scan the QR code with your authenticator app:
     - **Google Authenticator** ([iOS](https://apps.apple.com/app/google-authenticator/id388497605) | [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2))
     - **Microsoft Authenticator** ([iOS](https://apps.apple.com/app/microsoft-authenticator/id983156458) | [Android](https://play.google.com/store/apps/details?id=com.azure.authenticator))
     - **Authy** ([iOS](https://apps.apple.com/app/authy/id494168017) | [Android](https://play.google.com/store/apps/details?id=com.authy.authy))
   - Alternatively, click "Add code manually" to copy the secret and enter it in your app
   - Enter the 6-digit code from your authenticator app to verify

3. **Logging In with TOTP**
   - Enter your email and password as usual
   - You'll be prompted to enter the 6-digit code from your authenticator app
   - Enter the current code and you'll be logged in

4. **Removing TOTP**
   - Go to your account settings
   - Click the "Remove" button
   - Enter your current TOTP code to confirm removal

### For Developers/Administrators

## Configuration

The plugin is configured in `src/payload.config.ts`:

```typescript
payloadTotp({
  collection: 'users',
  // Optional: Force users to set up TOTP after first login (default: false)
  // forceSetup: process.env.TOTP_FORCE_SETUP === 'true',
  // Optional: Customize TOTP settings
  // totp: {
  //   issuer: 'Fullstack Factory CMS',
  //   digits: 6,
  //   period: 30,
  //   algorithm: 'SHA1',
  // },
})
```

### Configuration Options

#### `collection` (required)
The slug of the collection with `auth: true` that should have TOTP protection. Currently supports one collection at a time.

```typescript
collection: 'users'
```

#### `forceSetup` (optional)
Force users to set up TOTP after their first login. Default is `false` (optional).

```typescript
forceSetup: true
```

To enable via environment variable:
```env
TOTP_FORCE_SETUP=true
```

#### `disabled` (optional)
Conditionally disable the plugin based on runtime conditions.

```typescript
disabled: process.env.NODE_ENV === 'development'
```

#### `totp` (optional)
Customize the TOTP configuration:

```typescript
totp: {
  issuer: 'Your Company Name',  // Name shown in authenticator apps
  digits: 6,                     // Number of digits in code (default: 6)
  period: 30,                    // Validity period in seconds (default: 30)
  algorithm: 'SHA1',             // Hash algorithm: 'SHA1', 'SHA256', 'SHA512' (default: 'SHA1')
}
```

#### `forceWhiteBackgroundOnQrCode` (optional)
Render QR codes with a white background for better readability in dark themes.

```typescript
forceWhiteBackgroundOnQrCode: true
```

#### `disableAccessWrapper` (optional)
Disable the automatic access control wrapper. By default, the plugin wraps all collection and global access controls to require TOTP verification.

```typescript
disableAccessWrapper: true
```

### Per-Collection/Global Access Control

You can disable the access wrapper for specific collections or globals:

```typescript
export const Posts: CollectionConfig = {
  slug: 'posts',
  // ... other config
  custom: {
    totp: {
      disableAccessWrapper: {
        read: true,      // Allow reading without TOTP
        create: true,    // Allow creating without TOTP
        update: false,   // Require TOTP for updates
        delete: false,   // Require TOTP for deletes
      },
    },
  },
}
```

Available options:
- `read` - Reading documents
- `readVersions` - Reading document versions
- `create` - Creating documents
- `update` - Updating documents
- `delete` - Deleting documents
- `unlock` - Unlocking documents

## Environment Variables

You can control TOTP behavior through environment variables:

```env
# Force all users to set up TOTP (optional)
TOTP_FORCE_SETUP=true

# Disable TOTP in development (optional)
TOTP_DISABLED=true
```

Then in your config:

```typescript
payloadTotp({
  collection: 'users',
  forceSetup: process.env.TOTP_FORCE_SETUP === 'true',
  disabled: process.env.TOTP_DISABLED === 'true',
})
```

## API Endpoints

The plugin adds the following endpoints:

- `POST /api/setup-totp` - Set up TOTP for the current user
- `POST /api/verify-totp` - Verify TOTP code
- `POST /api/remove-totp` - Remove TOTP from account

## Admin Routes

- `/admin/setup-totp` - TOTP setup page
- `/admin/verify-totp` - TOTP verification page

## Security Best Practices

1. **Backup Codes**: Consider implementing backup codes for account recovery
2. **Force Setup**: Enable `forceSetup: true` for sensitive applications
3. **HTTPS Only**: Always use HTTPS in production
4. **Secret Storage**: The TOTP secret is stored securely in the database
5. **API Key Access**: Users can still use API keys without TOTP if `enableAPIKey` is enabled

## Troubleshooting

### "Incorrect code" error
- Ensure your device's clock is synchronized
- Check that you're using the correct account in your authenticator app
- Wait for a new code to generate and try again

### Setup button not visible
- Ensure `forceSetup` is set correctly
- Check that the user has TOTP not already configured

### Cannot access collections/globals
- Check the `disableAccessWrapper` settings
- Verify your TOTP is set up correctly
- Ensure you've verified your TOTP code

## User Guide for Customers

### Setting Up Two-Factor Authentication

1. **Log in to your account**
   - Access the CMS admin panel at `/admin`

2. **Go to Account Settings**
   - Click on your profile/name in the top right
   - Select "Account" from the dropdown

3. **Set Up Authenticator App**
   - Scroll down to the "Authenticator app" section
   - Click the "Setup" button

4. **Install an Authenticator App** (if you don't have one):
   - Download one of these apps on your smartphone:
     - Google Authenticator
     - Microsoft Authenticator
     - Authy
     - 1Password
     - Any TOTP-compatible app

5. **Scan the QR Code**
   - Open your authenticator app
   - Tap "Add account" or "+" button
   - Select "Scan QR code"
   - Point your camera at the QR code on screen

6. **Or Enter Code Manually**
   - If you can't scan, click "Add code manually"
   - Copy the secret code
   - In your authenticator app, choose "Enter setup key"
   - Paste the code

7. **Verify Setup**
   - Your app will now show a 6-digit code that refreshes every 30 seconds
   - Enter the current code in the "Enter code" field
   - Click "Verify"

8. **Success!**
   - Two-factor authentication is now active
   - You'll need to enter a code from your app every time you log in

### Logging In with 2FA

1. Enter your email and password as usual
2. When prompted, open your authenticator app
3. Enter the 6-digit code shown for this account
4. Click "Log in"

**Note**: Codes refresh every 30 seconds, so make sure to enter it before it expires!

### Removing Two-Factor Authentication

1. Go to Account Settings
2. Find the "Authenticator app" section
3. Click the "Remove" button
4. Enter your current TOTP code to confirm
5. Two-factor authentication will be removed

## Support

For issues or questions:
- Check the [payload-totp GitHub repository](https://github.com/GeorgeHulpoi/payload-totp)
- Review the [Payload CMS documentation](https://payloadcms.com/docs)
- Contact your system administrator

## Technical Details

- **Package**: `payload-totp`
- **Version**: Latest
- **Payload Version**: 3.x
- **Algorithm**: SHA1 (default), configurable to SHA256 or SHA512
- **Code Length**: 6 digits (default), configurable
- **Code Validity**: 30 seconds (default), configurable
- **Storage**: TOTP secrets are stored encrypted in the database

## Migration Notes

If you're adding TOTP to an existing project:
- Existing users without TOTP can continue logging in normally
- No database migration needed
- Users can opt-in to TOTP from their account settings
- To require TOTP for all users, set `forceSetup: true`
