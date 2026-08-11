import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import crypto from "crypto";
import {
  EMAIL_VERIFICATION_EXPIRY,
  EMAIL_VERIFICATION_SUBJECT,
  EMAIL_VERIFICATION_MESSAGE,
} from "./constant.js";


// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};


// Generate token expiry
const getVerificationTokenExpiry = () => {
  return new Date(Date.now() + EMAIL_VERIFICATION_EXPIRY);
};


// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// Send verification email
const sendVerificationEmail = async (email, token) => {
  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: EMAIL_VERIFICATION_SUBJECT,

    html: `
      <!DOCTYPE html>
      <html>
        <body style="
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 30px;
        ">

          <div style="
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
          ">

            <h2>Email Verification</h2>

            <p>
              ${EMAIL_VERIFICATION_MESSAGE}
            </p>

            <div style="text-align: center; margin: 30px 0;">

              <a
                href="${verificationUrl}"
                style="
                  background-color: #4f46e5;
                  color: white;
                  padding: 12px 25px;
                  text-decoration: none;
                  border-radius: 6px;
                  display: inline-block;
                "
              >
                Verify Email
              </a>

            </div>

            <p>
              This verification link will expire in
              <strong>15 minutes</strong>.
            </p>

            <p>
              If you did not create an account, you can safely ignore
              this email.
            </p>

            <hr />

            <p style="color: #777;">
              Regards,<br />
              Your App Team
            </p>

          </div>

        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};


// Hash verification token before storing in DB
const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};
//configure cloudinary
cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});


// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


export {
  generateVerificationToken,
  getVerificationTokenExpiry,
  sendVerificationEmail,
  hashToken,
  upload,
};

export default cloudinary;