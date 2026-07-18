import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/80 border-t border-cream/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="font-serif text-2xl font-semibold text-cream">
              SmartHire<span className="text-gold">AI</span>
            </Link>
            <p className="mt-4 text-sm text-cream/60 max-w-xs">
              Empowering recruiters and job seekers with AI‑driven insights.
            </p>
          </div>

          {/* Features */}
          <div>
            <h5 className="font-semibold text-cream text-sm uppercase tracking-wider">Features</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-cream transition-colors">
                  AI Resume Analysis
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cream transition-colors">
                  ATS Optimization
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cream transition-colors">
                  Candidate Matching
                </a>
              </li>
            </ul>
          </div>

          {/* How It Works */}
          <div>
            <h5 className="font-semibold text-cream text-sm uppercase tracking-wider">How It Works</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#how-it-works" className="hover:text-cream transition-colors">
                  Create Profile
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cream transition-colors">
                  AI Analysis
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cream transition-colors">
                  Connect & Hire
                </a>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h5 className="font-semibold text-cream text-sm uppercase tracking-wider">For Recruiters</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#for-recruiters" className="hover:text-cream transition-colors">
                  AI Screening
                </a>
              </li>
              <li>
                <a href="#for-recruiters" className="hover:text-cream transition-colors">
                  Candidate Ranking
                </a>
              </li>
              <li>
                <a href="#for-recruiters" className="hover:text-cream transition-colors">
                  Analytics
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 text-center text-sm text-cream/40">
          &copy; {new Date().getFullYear()} SmartHire AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}