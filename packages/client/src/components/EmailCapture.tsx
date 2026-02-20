import { motion, type Variants } from 'framer-motion';
import {
   Flame,
   ArrowRight,
   CheckCircle,
   Loader2,
   AlertCircle,
} from 'lucide-react';
import { useState } from 'react';

const fadeUp: Variants = {
   hidden: { opacity: 0, y: 20 },
   visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: i * 0.1,
         duration: 0.5,
         ease: 'easeOut',
      },
   }),
};

export default function EmailCapture() {
   const [formData, setFormData] = useState({ fullName: '', email: '' });
   const [status, setStatus] = useState<
      'idle' | 'loading' | 'success' | 'error'
   >('idle');
   const [errorMessage, setErrorMessage] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('loading');
      setErrorMessage('');

      try {
         const response = await fetch('http://localhost:3000/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error || 'Something went wrong.');
         }

         setStatus('success');
         setFormData({ fullName: '', email: '' });
      } catch (error: any) {
         setStatus('error');
         setErrorMessage(
            error.message || 'Failed to subscribe. Please try again.'
         );
      }
   };

   return (
      <section className="py-24 bg-black relative overflow-hidden">
         {/* Background Gradient */}
         <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950/30" />

         <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-2xl">
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Copy Side */}
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                     className="text-left space-y-6"
                  >
                     <motion.div
                        variants={fadeUp}
                        custom={1}
                        className="flex items-center space-x-2"
                     >
                        <Flame className="h-6 w-6 text-red-600" />
                        <span className="text-red-600 font-bold uppercase tracking-wider text-sm">
                           Limited Time Offer
                        </span>
                     </motion.div>

                     <motion.h2
                        variants={fadeUp}
                        custom={2}
                        className="text-4xl md:text-5xl font-black text-white leading-tight"
                     >
                        GET THE 7-DAY{' '}
                        <span className="text-red-600">FAT LOSS</span> BLUEPRINT
                     </motion.h2>

                     <motion.p
                        variants={fadeUp}
                        custom={3}
                        className="text-gray-400 text-lg"
                     >
                        Discover the exact strategy to drop body fat and reveal
                        muscle in just one week.
                        <span className="text-white font-semibold">
                           {' '}
                           No starvation. No hours of cardio.
                        </span>
                     </motion.p>

                     <motion.ul
                        variants={fadeUp}
                        custom={4}
                        className="space-y-3 text-gray-300"
                     >
                        {[
                           'Scorch stubborn belly fat',
                           'Retain muscle mass',
                           'Boost energy levels',
                        ].map((item, i) => (
                           <li key={i} className="flex items-center space-x-3">
                              <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                              <span>{item}</span>
                           </li>
                        ))}
                     </motion.ul>
                  </motion.div>

                  {/* Form Side */}
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.4 }}
                     className="bg-black/40 p-6 rounded-xl border border-zinc-800"
                  >
                     {status === 'success' ? (
                        <div className="text-center py-10 space-y-4">
                           <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                              <CheckCircle className="h-8 w-8 text-green-500" />
                           </div>
                           <h3 className="text-2xl font-bold text-white">
                              You're In!
                           </h3>
                           <p className="text-gray-400">
                              Check your email for your download link. It should
                              arrive instantly.
                           </p>
                           <button
                              onClick={() => setStatus('idle')}
                              className="text-red-500 hover:text-red-400 text-sm font-semibold mt-4"
                           >
                              Send to another email
                           </button>
                        </div>
                     ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                           <div className="space-y-2">
                              <label
                                 htmlFor="fullName"
                                 className="text-sm font-medium text-gray-300"
                              >
                                 Full Name
                              </label>
                              <input
                                 id="fullName"
                                 type="text"
                                 required
                                 placeholder="John Doe"
                                 value={formData.fullName}
                                 onChange={(e) =>
                                    setFormData({
                                       ...formData,
                                       fullName: e.target.value,
                                    })
                                 }
                                 className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                              />
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="email"
                                 className="text-sm font-medium text-gray-300"
                              >
                                 Email Address
                              </label>
                              <input
                                 id="email"
                                 type="email"
                                 required
                                 placeholder="john@example.com"
                                 value={formData.email}
                                 onChange={(e) =>
                                    setFormData({
                                       ...formData,
                                       email: e.target.value,
                                    })
                                 }
                                 className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                              />
                           </div>

                           {status === 'error' && (
                              <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-3 flex items-start space-x-2 text-red-200 text-sm">
                                 <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                 <span>{errorMessage}</span>
                              </div>
                           )}

                           <button
                              type="submit"
                              disabled={status === 'loading'}
                              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-900/20 flex items-center justify-center space-x-2"
                           >
                              {status === 'loading' ? (
                                 <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>SENDING...</span>
                                 </>
                              ) : (
                                 <>
                                    <span>DOWNLOAD NOW</span>
                                    <ArrowRight className="h-5 w-5" />
                                 </>
                              )}
                           </button>

                           <p className="text-center text-xs text-gray-500 mt-4">
                              Strictly confidential. No spam. Unsubscribe
                              anytime.
                           </p>
                        </form>
                     )}
                  </motion.div>
               </div>
            </div>
         </div>
      </section>
   );
}
