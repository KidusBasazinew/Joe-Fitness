import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

const supabase = createClient(
   process.env.VITE_SUPABASE_URL!,
   process.env.VITE_SUPABASE_ANON_KEY! // important
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

   // Check if user exists
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

   await resend.emails.send({
      from: 'Joe Fitness <onboarding@resend.dev>',
      to: cleanEmail,
      subject: '🔥 Your 7-Day Fat Loss Blueprint Is Inside',
      html: `<h1>You're In ${fullName}!</h1>
           <a href="https://joefitness.live/download/ebook.pdf">
           Download Now
           </a>`,
   });

   return res.status(200).json({ success: true });
}
