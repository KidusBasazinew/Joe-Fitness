import { motion, type Variants } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';

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

export default function CTASection() {
   return (
      <section className="py-20 bg-black relative overflow-hidden">
         {/* Background */}
         <div className="absolute inset-0">
            <img
               src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920"
               alt="Fat loss motivation"
               className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-red-600/20" />
         </div>

         {/* Content */}
         <div className="container mx-auto px-6 relative z-10">
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={{
                  visible: {
                     transition: {
                        staggerChildren: 0.15,
                     },
                  },
               }}
               className="max-w-4xl mx-auto text-center"
            >
               {/* Flames + Subtitle */}
               <motion.div
                  variants={fadeUp}
                  className="flex items-center justify-center space-x-2 mb-6"
               >
                  <Flame className="h-8 w-8 text-red-600" />
                  <span className="text-red-600 font-bold uppercase tracking-wider text-lg">
                     Ready to Burn Fat?
                  </span>
                  <Flame className="h-8 w-8 text-red-600" />
               </motion.div>

               {/* Heading */}
               <motion.h2
                  variants={fadeUp}
                  className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
               >
                  YOUR FAT LOSS
                  <span className="block text-red-600">JOURNEY STARTS NOW</span>
               </motion.h2>

               {/* Paragraph */}
               <motion.p
                  variants={fadeUp}
                  className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
               >
                  Stop struggling with fad diets. With Joe Fatloss, get daily
                  workouts, meal plans you actually enjoy, and motivation to
                  keep you consistent. Discover the “securate” system that makes
                  fat loss simple and sustainable.
               </motion.p>

               {/* Buttons */}
               <motion.div
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
               >
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="bg-red-600 text-white px-10 py-4 rounded-lg font-black text-lg hover:bg-red-700 transition-all duration-300 flex items-center space-x-3"
                  >
                     <span>START 7-DAY TRIAL</span>
                     <ArrowRight className="h-6 w-6" />
                  </motion.button>

                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="border-2 border-white text-white px-10 py-4 rounded-lg font-black text-lg hover:bg-white hover:text-black transition-all duration-300"
                  >
                     LEARN MORE
                  </motion.button>
               </motion.div>

               {/* Features Grid */}
               <motion.div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                  {[
                     {
                        title: 'No Hunger Pains',
                        desc: 'Eat satisfying meals while staying in fat-burning range',
                     },
                     {
                        title: 'Daily Guidance',
                        desc: 'Workouts, meals, and motivation delivered every day',
                     },
                     {
                        title: 'Proven Method',
                        desc: 'Joe Fatloss system with thousands of success stories',
                     },
                  ].map((item, i) => (
                     <motion.div
                        key={item.title}
                        variants={fadeUp}
                        custom={i + 1}
                        className="text-center"
                     >
                        <h4 className="text-white font-bold mb-2">
                           {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                     </motion.div>
                  ))}
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
}
