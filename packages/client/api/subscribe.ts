import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
   process.env.VITE_SUPABASE_URL!,
   process.env.VITE_SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {
   if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
   }

   const { fullName, email } = req.body;

   if (!fullName || !email) {
      return res.status(400).json({ error: 'Missing fields' });
   }

   const cleanEmail = email.toLowerCase().trim();

   // Store in Supabase
   const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', cleanEmail)
      .single();

   if (!existingUser) {
      await supabase.from('users').insert({
         full_name: fullName,
         email: cleanEmail,
      });
   }

   // NodeMailer transporter using Gmail
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL_USER, // your Gmail
         pass: process.env.EMAIL_PASS, // App password (not normal password)
      },
   });
   const downloadLink = 'https://joefitness.live/download/ebook.pdf'; // Replace with actual link
   const mailOptions = {
      from: `"Joe Fitness" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: '🔥 Your 7-Day Fat Loss Blueprint Is Inside',
      html: `
<div style="margin:0; padding:0; background-color:#0d0d0d; font-family:Arial, Helvetica, sans-serif;">
  <div style="max-width:600px; margin:0 auto; background-color:#ffffff;">

    <!-- HEADER -->
    <div style="background-color:#000000; padding:30px; text-align:center;">
      <h1 style="color:#ff1a1a; margin:0; font-size:28px; letter-spacing:2px; text-transform:uppercase;">
        JOE FAT LOSS
      </h1>
      <p style="color:#ffffff; margin-top:8px; font-size:13px; letter-spacing:1px;">
        ELITE TRANSFORMATION SYSTEM
      </p>
    </div>

    <!-- BODY -->
    <div style="padding:40px 30px;">

      <h2 style="color:#000000; font-size:24px; margin-top:0;">
        ${fullName}, This Is Where Your Old Body Dies.
      </h2>

      <p style="font-size:16px; line-height:1.7; color:#333;">
        You didn’t sign up for information.
      </p>

      <p style="font-size:16px; line-height:1.7; color:#333;">
        You signed up for <strong>change</strong>.
      </p>

      <p style="font-size:16px; line-height:1.7; color:#333;">
        And over the next 7 days, you’re going to prove to yourself that you're not average.
      </p>

      <!-- POWER BOX -->
      <div style="background-color:#f5f5f5; border-left:5px solid #ff1a1a; padding:20px; margin:30px 0;">
        <p style="margin:0; font-weight:bold; color:#000;">Inside This Program:</p>
        <ul style="margin-top:15px; padding-left:20px; color:#333; line-height:1.6;">
          <li>The metabolism reset method that most trainers never teach.</li>
          <li>A fat-burning blueprint designed for real-world schedules.</li>
          <li>The psychological trigger that makes consistency automatic.</li>
        </ul>
      </div>

      <p style="font-size:16px; line-height:1.7; color:#333;">
        But listen carefully —
      </p>

      <p style="font-size:16px; line-height:1.7; font-weight:bold; color:#000;">
        This only works if you execute.
      </p>

      <!-- CTA BUTTON -->
      <div style="text-align:center; margin:40px 0;">
        <a href="${downloadLink}" 
           style="background-color:#ff1a1a; 
                  color:#ffffff; 
                  padding:18px 35px; 
                  text-decoration:none; 
                  font-size:18px; 
                  font-weight:bold; 
                  text-transform:uppercase; 
                  border-radius:4px; 
                  display:inline-block;
                  box-shadow:0 6px 12px rgba(255,26,26,0.35);">
          DOWNLOAD THE 7-DAY PROGRAM NOW
        </a>
      </div>

      <p style="font-size:15px; color:#777; text-align:center;">
        This link may expire. Don’t “save it for later.”  
        The version of you that waits… stays the same.
      </p>

      <p style="margin-top:40px; font-size:16px; font-weight:bold;">
        Stay disciplined,<br>
        Joe
      </p>

    </div>

    <!-- FOOTER -->
    <div style="background-color:#000000; padding:20px; text-align:center;">
      <p style="color:#999; font-size:12px; margin:0;">
        © ${new Date().getFullYear()} Joe Fat Loss. All rights reserved.
      </p>
    </div>

  </div>
</div>
`,
   };

   try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true });
   } catch (err: any) {
      console.error('Email send error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
   }
}
