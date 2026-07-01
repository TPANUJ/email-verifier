const dns = require("dns").promises;
const generateOTP = require("otp-generator-tanu");
const nodemailer = require('nodemailer')




async function verifyEmail(email, from, pass,  otpLength= 7,
    expiryMinutes=5,
    branding = {}) {


       const {
        appName = "Your App",
        logo = "",
        primaryColor = "#2563eb",
        supportEmail = ""
    } = branding;

   const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;



   if (regex.test(email)) {
      console.log("valid email format");
   } else {
      console.log("invalid email format");

      return {
         success: false,
         message: "Invalid email"
      };

   }


   const domain = email.split("@")[1];

   try {
      const addresses = await dns.resolveMx(domain);

      if (!addresses.length) {
         return {
            success: false,
            message: "Invalid email domain"
         };
      }

    

   } catch (err) {

      return {
         success: false,
         message: "Invalid email domain"
      };
   }





const otp = generateOTP(otpLength)



const sub = 'your verification otp is : '

const transporter = nodemailer.createTransport(
   {
      secure: true,
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
         user: from,
         pass: pass
      }
   }
)


try {

   transporter.sendMail({

      to: email,
      subject: "OTP Verification",
      html:` <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>OTP Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="480" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="padding:30px;text-align:center;background:${primaryColor};color:#fff;">

    ${logo ? `<img src="${logo}" width="70" style="margin-bottom:10px;border-radius:8px;" />` : ""}

    <h2 style="margin:0;font-size:22px;">
        ${appName}
    </h2>

</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:40px;text-align:center;">

    <h3 style="margin-bottom:10px;color:#333;">
        Email Verification
    </h3>

    <p style="color:#666;font-size:14px;margin-bottom:30px;">
        Use the OTP below to verify your email address.
    </p>

    <!-- OTP BOX -->
    <div style="
        display:inline-block;
        padding:16px 32px;
        font-size:30px;
        font-weight:bold;
        letter-spacing:8px;
        color:${primaryColor};
        background:#f1f5ff;
        border:2px dashed ${primaryColor};
        border-radius:10px;
    ">
        ${otp.otp}
    </div>

    <p style="margin-top:25px;color:#555;font-size:14px;">
        This OTP will expire in <b>${expiryMinutes} minutes</b>.
    </p>

    <p style="margin-top:10px;color:#888;font-size:12px;">
        Do not share this code with anyone.
    </p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="padding:20px;text-align:center;background:#fafafa;font-size:12px;color:#888;">

    ${supportEmail ? `
        Need help? Contact
        <a href="mailto:${supportEmail}" style="color:${primaryColor};text-decoration:none;">
            ${supportEmail}
        </a>
        <br/>
    ` : ""}

    © ${new Date().getFullYear()} ${appName}. All rights reserved.

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`

   });

   

} catch (err) {
   return(err);
}

return {
   otp
}

};





module.exports = {
   verifyEmail,
   
};






