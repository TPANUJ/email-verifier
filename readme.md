# email-verifier-tanu

A lightweight Node.js package for sending OTP emails with email validation, DNS verification, and customizable branding.

---

##  Installation

```bash id="install_1"
npm install email-verifier-tanu


const { verifyEmail } = require("email-verifier-tanu");

verifyEmail(
  "user@gmail.com",
  "your@gmail.com",
  "your-app-password",
  6,
  5,
  {
    appName: "My App",
    primaryColor: "#2563eb",
    logo: "https://example.com/logo.png",
    supportEmail: "support@myapp.com"
  }
);


verifyEmail(
  email,
  fromEmail,
  emailPassword,
  otpLength,
  expiryMinutes,
  branding
)



| Field         | Type   | Default     | Description                          |
|---------------|--------|-------------|--------------------------------------|
| appName       | string | "Your App"  | Application name shown in email      |
| logo          | string | ""          | Logo URL displayed in email         |
| primaryColor  | string | "#2563eb"   | Theme color for email template       |
| supportEmail  | string | ""          | Support contact email                |


{
  "success": true,
  "message": "OTP sent successfully"
}

- Validates email format using regex
- Verifies domain using DNS MX lookup
- Generates OTP
- Sends OTP email via Nodemailer
- Returns success response


Important Notes
- This package only sends OTP emails
- OTP verification is NOT included
- You must handle OTP storage in your backend
- You must handle OTP verification logic yourself
- Requires SMTP credentials (Gmail app password recommended)