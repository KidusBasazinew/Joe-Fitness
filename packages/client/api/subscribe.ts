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

   const mailOptions = {
      from: `"Joe Fitness" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: '🔥 Your 7-Day Fat Loss Blueprint Is Inside',
      html: `<h1>You're In ${fullName}!</h1>
             <a href="https://joefitness.live/download/ebook.pdf">
             Download Now
             </a>`,
   };

   try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true });
   } catch (err: any) {
      console.error('Email send error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
   }
}
