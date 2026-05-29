# Email OTP Verifier

A simple Node.js package to validate emails, generate OTPs, send verification emails, and verify OTPs.

---

# Features

* Email format validation
* MX record checking
* OTP generation
* OTP verification
* OTP expiry support
* Gmail SMTP integration
* Easy to use

---

# Installation

```bash
npm install email-otp-verifier
```

---

# Usage

## Import Package

```js
const { verifyEmail, verifyOtp } = require("email-otp-verifier");
```

---

# Send OTP

```js
await verifyEmail(
   "user@gmail.com",
   "yourgmail@gmail.com",
   "your_app_password"
);
```

---

# Verify OTP

```js
await verifyOtp("123456");
```

---

# Complete Example

```js
const { verifyEmail, verifyOtp } = require("email-otp-verifier");

async function test() {

   await verifyEmail(
      "user@gmail.com",
      "yourgmail@gmail.com",
      "your_app_password"
   );

   const result = await verifyOtp("123456");

   console.log(result);

}

test();
```

---

# Parameters

## verifyEmail(email, from, pass)

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| email     | String | User email                     |
| from      | String | Gmail address used to send OTP |
| pass      | String | Gmail App Password             |

---

## verifyOtp(userOtp)

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| userOtp   | String | OTP entered by user |

---

# Return Responses

## Success

```js
{
   success: true,
   message: "OTP verified"
}
```

---

## Failure

```js
{
   success: false,
   message: "Invalid OTP"
}
```

---

# OTP Expiry

OTP automatically expires after 5 minutes.

---

# Gmail Setup

You must use a Gmail App Password.

## Steps

1. Enable 2-Step Verification
2. Open Google Account Settings
3. Search "App Passwords"
4. Generate App Password
5. Use generated password in your code

---

# Example Output

```bash
valid email
Email sent
OTP verified
```

---

# Dependencies

* nodemailer
* dns
* otp-generator-tanu

---

# Notes

* Works only with Gmail SMTP
* Store credentials securely
* Designed for backend usage

---

# License

MIT
