email-verifier-tanu

A lightweight Node.js package for sending OTP emails with email validation, DNS verification, and customizable branding.

Features
Send OTP via email using Nodemailer
Email format validation
Domain validation using MX DNS lookup
Custom branding support (logo, app name, colors)
Lightweight and simple API
No database required (OTP storage handled by user application)
Installation
npm install email-verifier-tanu
Usage
const { verifyEmail } = require("email-verifier-tanu");

await verifyEmail(
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
Function Signature
verifyEmail(
  email,
  fromEmail,
  emailPassword,
  otpLength,
  expiryMinutes,
  branding
)
Branding Options
Option	Description	Default
appName	Application name shown in email	"Your App"
logo	Logo URL	""
primaryColor	Theme color for email UI	"#2563eb"
supportEmail	Support contact email	""
How It Works
Validates email format
Verifies email domain using DNS MX records
Generates OTP
Sends email using Nodemailer
Returns success response
Return Value
{
  success: true,
  message: "OTP sent successfully",
  otp: {
    otp: "123456"
  }
}
Important Notes
This package only sends OTP emails
It does not store OTPs
It does not verify OTPs
OTP verification must be implemented in your backend
Store OTP securely using database or Redis
Recommended Architecture
Frontend -> Request OTP
Backend -> Calls email-verifier-tanu
Backend -> Stores OTP
User -> Submits OTP
Backend -> Verifies OTP
Validation Features

Email validation:

Regex-based format check

Domain validation:

MX record lookup using DNS
Example Response
{
  success: true,
  message: "OTP sent successfully"
}
Requirements
Node.js 14 or higher
SMTP credentials (e.g. Gmail app password)
Internet connection for DNS lookup
Roadmap
Rate limiting support
Redis integration helper
OTP verification module
Multiple email templates
TypeScript support
License

MIT