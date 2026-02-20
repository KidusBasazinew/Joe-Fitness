import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const transporter = nodemailer.createTransport({
   service: 'gmail', // or specific host/port from env
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
   },
});

export const sendDownloadEmail = async (email: string, fullName: string) => {
   const downloadLink = 'https://yourdomain.com/download/ebook.pdf'; // Replace with actual link
   console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
   const mailOptions = {
      from: `"Joe Fat Loss" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔥 Your 7-Day Fat Loss Blueprint Is Inside',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #333;">
        <div style="background-color: #000000; padding: 20px; text-align: center;">
          <h1 style="color: #e10600; margin: 0; font-size: 24px; text-transform: uppercase;">Joe Fat Loss</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #000000; font-size: 22px; margin-top: 0;">You’re In, ${fullName}! Let’s Get To Work.</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #444;">
            You’ve just taken the first step towards a leaner, stronger version of yourself. Most people talk about change—you actually did something about it.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #444;">
            Inside this blueprint, you’ll find the exact strategy to start seeing visible results in just 7 days. No fluff, just actionable steps.
          </p>

          <div style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #e10600; margin: 25px 0;">
            <p style="margin: 0; font-weight: bold; color: #000;">Here’s what you’re about to discover:</p>
            <ul style="margin-top: 10px; padding-left: 20px;">
              <li style="margin-bottom: 8px;">The #1 mistake killing your fat loss progress.</li>
              <li style="margin-bottom: 8px;">A simple nutrition protocol that doesn't require starvation.</li>
              <li style="margin-bottom: 8px;">The training tweaks that double your caloric burn.</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 35px 0;">
            <a href="${downloadLink}" style="background-color: #e10600; color: #ffffff; padding: 15px 30px; text-decoration: none; font-weight: bold; font-size: 18px; border-radius: 4px; display: inline-block; text-transform: uppercase; box-shadow: 0 4px 6px rgba(225, 6, 0, 0.3);">
              DOWNLOAD YOUR 7-DAY FAT LOSS PROGRAM
            </a>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #444;">
            This link expires soon. Download it, read it, and execute.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #444;">
            I’ll be in your inbox over the next few days with more advanced strategies. Stay tuned.
          </p>

          <p style="font-size: 16px; margin-top: 30px; font-weight: bold;">
            To your success,<br>
            Joe
          </p>
        </div>

        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Joe Fat Loss. All rights reserved.</p>
          <p style="margin: 5px 0;">If you didn't request this email, you can safely ignore it.</p>
        </div>
      </div>
    `,
   };

   try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
   } catch (error) {
      console.error('Error sending email:', error);
      // Don't throw, just log. We don't want to fail the request if email sending fails potentially.
      // Or maybe we do? Requirement: "Return success JSON response" - implies we do this after sending.
   }
};
