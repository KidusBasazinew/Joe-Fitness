import { Play, ArrowRight, Shield, Trophy, Users, Flame } from 'lucide-react';
// import GymClasses from "./components/GymClasses";

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import EmailCapture from './components/EmailCapture';
import CTASection from './components/CTASection';

const features = [
   {
      icon: Shield,
      title: 'Smart Meal Structure',
      description:
         'Eat satisfying meals while staying in a calorie-smart zone — our system keeps you full and fat-burning all day.',
   },
   {
      icon: Trophy,
      title: 'Proven Fat Loss',
      description:
         'Follow the tried-and-tested Joe Fatloss method with daily guidance to get visible results quickly.',
   },
   {
      icon: Users,
      title: 'Motivation & Support',
      description:
         'Daily tips and reminders to keep you consistent, focused, and inspired throughout your journey.',
   },
   {
      icon: Flame,
      title: 'Effective Workouts',
      description:
         'Short, high-impact routines designed to burn fat, boost energy, and fit into your busy lifestyle.',
   },
];

const heroData = [
   {
      image: '/hero_1_2_person_1.webp',
      title: 'LOSE FAT, FEEL FULL',
      description:
         'Discover the Joe Fatloss system: easy-to-follow workouts, calorie-smart meals, and daily motivation to keep you on track. Start your free 7-day trial and see the difference.',
   },
   {
      image: '/hero_1_2_person_2.webp',
      title: 'YOUR DAILY FAT LOSS GUIDE',
      description:
         'From workouts to meals to mindset, get guided every day with our unique “securate” system that makes fat loss simple, sustainable, and satisfying.',
   },
];

const textVariants: Variants = {
   hidden: { opacity: 0, y: 40 },
   visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: i * 0.15,
         duration: 0.6,
         ease: 'easeOut',
      },
   }),
};

const imageVariants: Variants = {
   enter: { opacity: 0, x: 100, scale: 0.95 },
   center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
   },
   exit: { opacity: 0, x: -100, scale: 0.95, transition: { duration: 0.6 } },
};

const fadeUp: Variants = {
   hidden: { opacity: 0, y: 40 },
   visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: i * 0.2,
         duration: 0.6,
         ease: 'easeOut',
      },
   }),
};
const App = () => {
   const [index, setIndex] = useState(0);
   const current = heroData[index];

   useEffect(() => {
      const interval = setInterval(() => {
         setIndex((prev) => (prev + 1) % heroData.length);
      }, 7000);
      return () => clearInterval(interval);
   }, []);

   return (
      <main>
         <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
         >
            <div className="absolute inset-0 z-0">
               <img
                  src="/hero_bg_1_2.webp"
                  alt="Background"
                  className="w-full h-full object-cover opacity-30"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 text-white px-6 max-w-7xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Section */}
                  <motion.div
                     initial="hidden"
                     animate="visible"
                     className="space-y-6"
                  >
                     <motion.div
                        custom={1}
                        variants={textVariants}
                        className="flex items-center space-x-2"
                     >
                        <div className="w-12 h-0.5 bg-red-600"></div>
                        <span className="text-red-600 font-bold uppercase tracking-wider">
                           Elite Fitness
                        </span>
                     </motion.div>

                     <motion.h1
                        custom={2}
                        variants={textVariants}
                        className="text-5xl md:text-6xl font-black leading-tight max-w-full"
                     >
                        {(() => {
                           const words = current.title.split(' ');
                           const half = Math.ceil(words.length / 2);
                           return (
                              <>
                                 {words.slice(0, half).join(' ')}{' '}
                                 <span className="text-red-600">
                                    {words.slice(half).join(' ')}
                                 </span>
                              </>
                           );
                        })()}
                     </motion.h1>

                     <motion.p
                        // key={current.description}
                        custom={3}
                        variants={textVariants}
                        className="text-lg md:text-2xl text-gray-300 leading-relaxed max-w-lg"
                     >
                        {current.description}
                     </motion.p>

                     <motion.div
                        custom={4}
                        variants={textVariants}
                        className="flex flex-col sm:flex-row gap-6"
                     >
                        <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
                           <span>START YOUR JOURNEY</span>
                           <ArrowRight className="h-6 w-6" />
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center space-x-3">
                           <Play className="h-6 w-6" />
                           <span>WATCH STORY</span>
                        </button>
                     </motion.div>

                     <motion.div
                        custom={5}
                        variants={textVariants}
                        className="grid grid-cols-3 gap-8 pt-4"
                     >
                        {[
                           { stat: '7+', label: 'Days Free Trial' },
                           { stat: '1000+', label: 'Fat Loss Success Stories' },
                           { stat: '5+', label: 'Minutes/day Workouts' },
                        ].map((item, i) => (
                           <div className="text-center" key={i}>
                              <h3 className="text-4xl font-black text-red-600 mb-2">
                                 {item.stat}
                              </h3>
                              <p className="text-gray-400 uppercase text-sm font-semibold">
                                 {item.label}
                              </p>
                           </div>
                        ))}
                     </motion.div>
                  </motion.div>

                  {/* Image Section */}
                  <div className="relative">
                     <AnimatePresence mode="wait">
                        <motion.img
                           key={current.image}
                           src={current.image}
                           alt="Hero"
                           className="max-w-xl mx-auto rounded-xl"
                           variants={imageVariants}
                           initial="enter"
                           animate="center"
                           exit="exit"
                        />
                     </AnimatePresence>
                  </div>
               </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
               <div className="w-6 h-10 border-2 border-red-600 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-red-600 rounded-full mt-2 animate-pulse" />
               </div>
            </div>
         </section>
         <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Image Side */}
                  <motion.div
                     initial={{ opacity: 0, x: -100 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, ease: 'easeOut' }}
                     viewport={{ once: true }}
                     className="relative"
                  >
                     <img
                        src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Modern gym interior"
                        className="rounded-2xl shadow-2xl"
                     />
                     <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-8 -right-8 bg-red-600 text-white p-8 rounded-2xl shadow-xl"
                     >
                        <div className="text-center">
                           <h4 className="text-3xl font-black mb-2">5+</h4>
                           <p className="text-red-100 font-semibold">
                              Years Strong
                           </p>
                        </div>
                     </motion.div>
                  </motion.div>

                  {/* Text Side */}
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.4 }}
                     variants={{
                        visible: {
                           transition: {
                              staggerChildren: 0.15,
                           },
                        },
                     }}
                  >
                     <motion.div variants={fadeUp}>
                        <div className="flex items-center space-x-2 mb-6">
                           <div className="w-12 h-0.5 bg-red-600"></div>
                           <span className="text-red-600 font-bold uppercase tracking-wider">
                              About Us
                           </span>
                        </div>
                     </motion.div>

                     <motion.h2
                        variants={fadeUp}
                        className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight"
                     >
                        WHERE{' '}
                        <span className="block text-red-600">FAT MELTS</span>{' '}
                        AND HABITS STICK
                     </motion.h2>

                     <motion.p
                        variants={fadeUp}
                        className="text-lg text-gray-600 mb-8 leading-relaxed"
                     >
                        Joe Fatloss isn’t just another fitness guide — it’s a
                        complete digital system for transforming your body and
                        mindset. Daily workouts, easy-to-follow meal plans, and
                        motivational tips help you stay consistent while
                        enjoying your meals. Learn the secret “securate”
                        approach that makes fat loss effortless.
                     </motion.p>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {features.map((feature, index) => (
                           <motion.div
                              key={index}
                              variants={fadeUp}
                              custom={index + 1}
                              className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                           >
                              <div className="bg-red-600 p-3 rounded-lg flex-shrink-0">
                                 <feature.icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                 <h3 className="font-bold text-black mb-2">
                                    {feature.title}
                                 </h3>
                                 <p className="text-gray-600 text-sm">
                                    {feature.description}
                                 </p>
                              </div>
                           </motion.div>
                        ))}
                     </div>

                     <motion.button
                        variants={fadeUp}
                        className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                     >
                        START MY 7-DAY FREE TRIAL
                     </motion.button>
                  </motion.div>
               </div>
            </div>
         </section>
         <CTASection />
         <EmailCapture />
      </main>
   );
};

export default App;
