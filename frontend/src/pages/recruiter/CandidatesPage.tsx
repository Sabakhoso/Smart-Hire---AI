// src/pages/recruiter/CandidatesPage.tsx

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  Eye,
  Download,
  Mail,
} from "lucide-react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";

interface Candidate {
  id: number;
  name: string;
  role: string;
  location: string;
  experience: string;
  education: string;
  atsScore: number;
  status: "Shortlisted" | "Review" | "Interview";
}

const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Ali Raza",
    role: "Frontend Developer",
    location: "Karachi",
    experience: "2 Years",
    education: "BS Computer Science",
    atsScore: 94,
    status: "Shortlisted",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    role: "Backend Developer",
    location: "Lahore",
    experience: "3 Years",
    education: "BS Software Engineering",
    atsScore: 89,
    status: "Interview",
  },
  {
    id: 3,
    name: "Hamza Khan",
    role: "Machine Learning Engineer",
    location: "Islamabad",
    experience: "1 Year",
    education: "BS Artificial Intelligence",
    atsScore: 91,
    status: "Review",
  },
  {
    id: 4,
    name: "Fatima Noor",
    role: "UI/UX Designer",
    location: "Hyderabad",
    experience: "2 Years",
    education: "BS Media Sciences",
    atsScore: 86,
    status: "Shortlisted",
  },
  {
    id: 5,
    name: "Usman Tariq",
    role: "Data Analyst",
    location: "Multan",
    experience: "4 Years",
    education: "BS Data Science",
    atsScore: 96,
    status: "Interview",
  },
];

const CandidatesPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((candidate) => {
      const value = search.toLowerCase();

      return (
        candidate.name.toLowerCase().includes(value) ||
        candidate.role.toLowerCase().includes(value) ||
        candidate.location.toLowerCase().includes(value)
      );
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-[#FBF7F1] px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardHeader />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h1 className="font-serif text-3xl font-semibold text-[#3D2B1F]">
              Candidate Management
            </h1>

            <p className="mt-2 text-[#6B5847]">
              Browse, search and review AI-ranked candidates.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-[#A6764B]/30 bg-white px-5 py-3 font-medium text-[#3D2B1F] transition hover:border-[#A6764B]">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(61,43,31,0.06)]"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A7A6C]" />

            <input
              type="text"
              placeholder="Search candidates by name, role or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#3D2B1F]/10 py-3 pl-12 pr-4 outline-none transition focus:border-[#A6764B]"
            />
          </div>
        </motion.div>

        {/* Candidate Cards */}
        <div className="grid gap-6">
          {filteredCandidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_rgba(61,43,31,0.06)]"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#3D2B1F]">
                      {candidate.name}
                    </h2>

                    <p className="text-[#A6764B]">
                      {candidate.role}
                    </p>
                  </div>

                  <div className="grid gap-3 text-sm text-[#6B5847] sm:grid-cols-2">

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {candidate.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {candidate.experience}
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {candidate.education}
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      ATS Score:{" "}
                      <span className="font-semibold">
                        {candidate.atsScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-start gap-5 lg:items-end">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      candidate.status === "Shortlisted"
                        ? "bg-emerald-100 text-emerald-700"
                        : candidate.status === "Interview"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {candidate.status}
                  </span>

                  <div className="flex flex-wrap gap-3">

                    <button className="flex items-center gap-2 rounded-xl border border-[#3D2B1F]/10 px-4 py-2 transition hover:bg-[#FBF7F1]">
                      <Eye className="h-4 w-4" />
                      View
                    </button>

                    <button className="flex items-center gap-2 rounded-xl border border-[#3D2B1F]/10 px-4 py-2 transition hover:bg-[#FBF7F1]">
                      <Download className="h-4 w-4" />
                      Resume
                    </button>

                    <button className="flex items-center gap-2 rounded-xl bg-[#3D2B1F] px-4 py-2 text-white transition hover:bg-[#2B1D14]">
                      <Mail className="h-4 w-4" />
                      Contact
                    </button>

                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatesPage;