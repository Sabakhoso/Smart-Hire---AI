import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const floatingBlob = {
  animate: {
    x: [0, 20, -10, 0],
    y: [0, -20, 15, 0],
    scale: [1, 1.06, 0.98, 1],
    transition: {
      duration: 18,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-cream pt-24 md:pt-32 pb-20 md:pb-28"
    >
      {/* Background Blobs */}
      <motion.div
        variants={floatingBlob}
        animate="animate"
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(139,90,43,0.20) 0%, transparent 70%)',
        }}
      />
      <motion.div
        variants={floatingBlob}
        animate="animate"
        transition={{ delay: 3 }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, rgba(61,43,31,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left Content - Centered */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            {/* Badge */}
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <span className="inline-flex items-center rounded-full border border-brown/10 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-sm">
                AI-Powered Recruitment Platform
              </span>
            </motion.div>

            {/* Main Heading – much larger */}
            <motion.h1
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 font-serif text-7xl sm:text-8xl lg:text-9xl font-semibold leading-[1.05] tracking-[-0.03em] text-dark"
            >
              SmartHire <span className="text-gold">AI</span>
            </motion.h1>

            {/* Subtitle – larger and serif for elegance */}
            <motion.p
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-4 text-2xl sm:text-3xl font-serif text-muted max-w-xl mx-auto lg:mx-0"
            >
              AI-powered hiring platform for recruiters and job seekers.
            </motion.p>

            {/* Description */}
            <motion.p
              custom={0.35}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 text-lg leading-8 text-muted max-w-xl mx-auto lg:mx-0"
            >
              SmartHire AI empowers recruiters to discover top talent instantly,
              while helping job seekers build stronger resumes, improve ATS scores,
              and connect with the right opportunities – all driven by intelligent AI.
            </motion.p>

            {/* Feature Chips */}
            <motion.div
              custom={0.45}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {['Resume Analysis', 'ATS Scoring', 'AI Matching'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brown/10 bg-white px-5 py-2 text-sm font-medium text-dark shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Quote – kept only the editorial quote */}
            <motion.blockquote
              custom={0.55}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-10 border-l-2 border-gold/30 pl-5 italic text-muted text-left"
            >
              “The best opportunities begin with better decisions.”
            </motion.blockquote>

            {/* CTA Buttons */}
            <motion.div
              custom={0.7}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-brown px-8 py-3.5 text-sm font-button font-semibold text-cream shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center rounded-full border border-brown/15 bg-white px-8 py-3.5 text-sm font-button font-semibold text-dark hover:border-gold/40 hover:shadow-md transition-all duration-200"
              >
                Sign In
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={0.9}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-16 grid grid-cols-3 gap-8 border-t border-brown/10 pt-8"
            >
              <div>
                <h3 className="font-serif text-3xl font-semibold text-dark">95%</h3>
                <p className="mt-2 text-sm text-muted">Resume Match Accuracy</p>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-semibold text-dark">10x</h3>
                <p className="mt-2 text-sm text-muted">Faster Hiring</p>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-semibold text-dark">AI</h3>
                <p className="mt-2 text-sm text-muted">Smart Candidate Matching</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Dashboard (unchanged) */}
          <div className="flex-1 max-w-xl w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="relative"
            >
              {/* Main Card */}
              <div className="bg-white rounded-3xl border border-brown/10 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-brown/5 bg-cream/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                        Candidate Analysis
                      </p>
                      <h3 className="mt-1 text-2xl font-serif font-semibold text-dark">
                        Sarah Johnson
                      </h3>
                      <p className="text-sm text-muted">Senior Product Designer</p>
                    </div>
                    <div className="rounded-2xl bg-brown px-5 py-3 text-center">
                      <p className="text-xs uppercase tracking-widest text-beige">Match</p>
                      <p className="text-3xl font-bold text-cream">96%</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-dark">Resume Quality</span>
                      <span className="font-semibold text-gold">Excellent</span>
                    </div>
                    <div className="h-2 bg-beige rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="h-full bg-gold rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-dark">ATS Compatibility</span>
                      <span className="font-semibold text-gold">98%</span>
                    </div>
                    <div className="h-2 bg-beige rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '98%' }}
                        transition={{ duration: 1.2, delay: 1.0 }}
                        className="h-full bg-brown rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-dark">AI Recommendation</span>
                      <span className="font-semibold text-gold">Strong Hire</span>
                    </div>
                    <div className="h-2 bg-beige rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '91%' }}
                        transition={{ duration: 1.2, delay: 1.2 }}
                        className="h-full bg-gold/70 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating ATS Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                className="absolute -left-4 top-12 hidden md:block bg-white/90 backdrop-blur-sm rounded-2xl border border-brown/10 shadow-lg px-5 py-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                  ATS Score
                </p>
                <h3 className="text-3xl font-serif font-bold text-dark mt-1">96%</h3>
                <p className="text-sm text-muted">Resume optimized</p>
              </motion.div>

              {/* Floating AI Match Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.2,
                }}
                className="absolute -right-4 bottom-8 hidden md:block bg-white/90 backdrop-blur-sm rounded-2xl border border-brown/10 shadow-lg px-5 py-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                  AI Match
                </p>
                <h3 className="text-3xl font-serif font-bold text-dark mt-1">98%</h3>
                <p className="text-sm text-muted">Recruiter confidence</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}