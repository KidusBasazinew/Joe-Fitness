import { motion, type Variants } from "framer-motion";
import { Flame, CheckCircle } from "lucide-react";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function FreeSevenDay() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className=" relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg_form.jfif"
          alt="Workout Background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Content */}
      <div className="mt-20 relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-white space-y-6"
          >
            <motion.div
              custom={1}
              variants={fadeUp}
              className="flex items-center space-x-2"
            >
              <Flame className="text-red-600" />
              <span className="uppercase tracking-wider font-bold text-red-600">
                Free 7 Day Challenge
              </span>
            </motion.div>

            <motion.h1
              custom={2}
              variants={fadeUp}
              className="text-5xl md:text-6xl font-black leading-tight uppercase"
            >
              Burn Fat In <span className="text-red-600">7 Days</span>
            </motion.h1>

            <motion.p
              custom={3}
              variants={fadeUp}
              className="text-gray-300 text-lg max-w-lg"
            >
              Kickstart your transformation with a structured 7-day fat burning
              workout plan. No guesswork. No fluff. Just results.
            </motion.p>

            <motion.ul
              custom={4}
              variants={fadeUp}
              className="space-y-3 text-gray-200"
            >
              {[
                "Daily structured workouts",
                "Fat-burning routines",
                "Beginner friendly",
                "Instant download",
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* FORM */}
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                custom={5}
                variants={fadeUp}
                className="mt-8 bg-black/80 backdrop-blur-md border border-red-600/30 shadow-2xl rounded-2xl p-8 space-y-6"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300 text-white font-bold py-4 rounded-lg shadow-lg"
                >
                  GET FREE ACCESS NOW →
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Instant access • No spam • 100% Free
                </p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-black/80 backdrop-blur-md border border-green-500/40 rounded-2xl p-10 text-center text-white"
              >
                <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
                <h2 className="text-3xl font-black uppercase mb-4">
                  Check Your Email 📩
                </h2>
                <p className="text-gray-300">
                  Your free 7-day fat loss program is on its way.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT SIDE - BOOK */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <motion.img
              src="/book_cover.png"
              alt="Fat Loss Program Book"
              className="max-w-4xl drop-shadow-[0_20px_60px_rgba(220,38,38,0.5)]"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
