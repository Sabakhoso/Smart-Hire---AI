import { motion } from 'framer-motion';
import { FileText, Target, Users, Zap, BarChart3, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'AI Resume Analysis',
    description: 'Instantly analyze resumes for ATS compatibility, keyword density, and improvement suggestions.',
  },
  {
    icon: Target,
    title: 'ATS Optimization',
    description: 'Tailor resumes to pass automated screening systems with higher match scores.',
  },
  {
    icon: Users,
    title: 'Candidate Matching',
    description: 'Use AI to match job requirements with candidate profiles based on skills and experience.',
  },
  {
    icon: Zap,
    title: 'Recruitment Automation',
    description: 'Automate repetitive tasks like screening, scheduling, and initial outreach.',
  },
  {
    icon: BarChart3,
    title: 'Interview Insights',
    description: 'Get AI-generated summaries and feedback from interview recordings.',
  },
  {
    icon: Lightbulb,
    title: 'Smart Job Recommendations',
    description: 'Personalized job suggestions for candidates based on career goals and skills.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,   // <-- add 'as const'
    },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-cream/80 border-y border-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-dark">
            Built for modern recruitment
          </h2>
          <p className="mt-4 text-lg text-muted">
            Powerful AI tools that streamline hiring and help candidates stand out.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="bg-white rounded-3xl border border-brown/10 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-beige/60 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-brown" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-dark">{feature.title}</h3>
              <p className="mt-3 text-muted text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}