import { motion } from 'framer-motion';
import { Building2, Users, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '87%', label: 'Faster time-to-hire' },
  { value: '3.2x', label: 'More qualified applicants' },
  { value: '94%', label: 'Recruiter satisfaction' },
];

export default function ForRecruitersSection() {
  return (
    <section id="for-recruiters" className="py-20 md:py-28 bg-cream/60 border-y border-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.28em] text-gold bg-gold/10 rounded-full px-4 py-1.5 mb-4">
              For Recruiters
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-dark">
              Hire the best talent, faster
            </h2>
            <p className="mt-4 text-lg text-muted">
              SmartHire AI supercharges your recruitment process with AI‑powered screening,
              automated outreach, and intelligent candidate matching – so you can focus on
              building great teams.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <h4 className="text-3xl font-serif font-bold text-dark">{stat.value}</h4>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link
              to="/register"
              className="inline-flex items-center mt-10 rounded-full bg-brown px-8 py-3.5 text-sm font-button font-semibold text-cream shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Start hiring smarter
            </Link>
          </div>

          {/* Right - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-brown/10 p-6 shadow-sm hover:shadow-md transition-shadow">
              <Building2 className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
              <h4 className="text-lg font-serif font-semibold text-dark">AI Screening</h4>
              <p className="mt-2 text-sm text-muted">Automatically filter candidates based on skills and experience.</p>
            </div>
            <div className="bg-white rounded-3xl border border-brown/10 p-6 shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
              <h4 className="text-lg font-serif font-semibold text-dark">Candidate Ranking</h4>
              <p className="mt-2 text-sm text-muted">Get ranked shortlists with match scores and insights.</p>
            </div>
            <div className="bg-white rounded-3xl border border-brown/10 p-6 shadow-sm hover:shadow-md transition-shadow">
              <Clock className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
              <h4 className="text-lg font-serif font-semibold text-dark">Faster Interviews</h4>
              <p className="mt-2 text-sm text-muted">Schedule and conduct interviews seamlessly.</p>
            </div>
            <div className="bg-white rounded-3xl border border-brown/10 p-6 shadow-sm hover:shadow-md transition-shadow">
              <TrendingUp className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
              <h4 className="text-lg font-serif font-semibold text-dark">Analytics</h4>
              <p className="mt-2 text-sm text-muted">Track pipeline metrics and improve your hiring strategy.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}