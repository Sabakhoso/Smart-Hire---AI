import { motion } from 'framer-motion';
import { CircleCheck, UserSearch, FileCheck, Rocket } from 'lucide-react';

const steps = [
  {
    icon: UserSearch,
    title: '1. Create Profile',
    description: 'Sign up as a recruiter or job seeker and complete your profile with relevant details.',
  },
  {
    icon: FileCheck,
    title: '2. AI Analysis',
    description: 'Our AI analyzes resumes, job descriptions, and preferences to find the best matches.',
  },
  {
    icon: Rocket,
    title: '3. Connect & Hire',
    description: 'Review matches, schedule interviews, and make data-driven hiring decisions.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-dark">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted">
            From sign‑up to hire – in three simple steps.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-8 lg:gap-16 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5 bg-brown/10" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex-1 text-center relative"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-beige/60 flex items-center justify-center mb-6 relative z-10">
                <step.icon className="w-8 h-8 text-brown" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-dark">{step.title}</h3>
              <p className="mt-3 text-sm text-muted max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}