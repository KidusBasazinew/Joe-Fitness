import express, { type Request, type Response, Router } from 'express';
import db from './db';
import { sendDownloadEmail } from './email';

const router = Router();

// Validate email regex
const isValidEmail = (email: string): boolean => {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

router.post('/subscribe', async (req: Request, res: Response) => {
   try {
      const { fullName, email } = req.body;

      if (!fullName || !email) {
         res.status(400).json({ error: 'Full name and email are required.' });
         return;
      }

      if (!isValidEmail(email)) {
         res.status(400).json({ error: 'Invalid email address.' });
         return;
      }

      const cleanEmail = email.toLowerCase().trim();

      // Check if user exists
      const existingUser = db
         .prepare('SELECT * FROM users WHERE email = ?')
         .get(cleanEmail) as { id: number; full_name: string } | undefined;

      if (existingUser) {
         console.log(`User already exists: ${cleanEmail}. Resending email.`);
         // Send email again
         await sendDownloadEmail(cleanEmail, existingUser.full_name);
         res.json({
            success: true,
            message: 'Welcome back! We sent the guide to your email again.',
         });
         return;
      }

      // Insert new user
      const insert = db.prepare(
         'INSERT INTO users (full_name, email) VALUES (?, ?)'
      );
      insert.run(fullName, cleanEmail);

      // Send email
      await sendDownloadEmail(cleanEmail, fullName);

      res.json({
         success: true,
         message: 'You are subscribed! Check your inbox.',
      });
   } catch (error) {
      console.error('Subscription error:', error);
      res.status(500).json({ error: 'Internal server error.' });
   }
});

export default router;
