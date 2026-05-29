const dns = require("dns");
const generateOTP = require("otp-generator-tanu");
const nodemailer = require('nodemailer')


let storedOtp = "";
let expiresAt = "";

async function verifyEmail(email , from, pass) {

    const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    

     if(regex.test(email)){
        console.log("valid email format");
     }else{
      console.log("invalid email format");
      
          return {
            success: false,
            message: "Invalid email"
        };

     }


      const domain = email.split("@")[1];

      await dns.resolveMx(domain, (err, addresses) => {

      if(err || !addresses.length){
         console.log("Invalid email domain");
            return {
                success: false,
                message: "Invalid email domain"
            };
         
      }else{
         console.log("valid domain");
         
      }

     

   });

    const otp = generateOTP(6)

   storedOtp = otp.otp;
   expiresAt = otp.expiresAt;
   console.log(storedOtp);

    const sub = 'your verification otp is : '

    const transporter =  nodemailer.createTransport(
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
//tfsr zfsi cffu fwwt

    try {

   await transporter.sendMail({
      
      to: email,
      subject: "OTP Verification",
      html: `<h1>${otp.otp}</h1>`
   });

   console.log("Email sent");

} catch(err) {
   console.log(err);
}
    
return{
   otp
}

}




async function verifyOtp(userOtp) {

   
    if (!storedOtp) {
        console.log("No OTP found");

          return {
            success: false,
            message: "No OTP found"
        };
    }

    
    if (Date.now() > expiresAt) {
        console.log("otp expired");
        
        return {
           success: false,
           message: "otp expired"
        }

        storedOtp = "";
        expiresAt = 0;

        return;
    }

   
    if (storedOtp === userOtp) {

        console.log("OTP verified");
        return {
            success: true,
            message: "OTP verified"
        };

      
        storedOtp = "";
        expiresAt = 0;

    } else {


         return {
        success: false,
        message: "Invalid OTP"
    };
        console.log("Invalid OTP");

    }

}

module.exports = {
   verifyEmail,
   verifyOtp
};






