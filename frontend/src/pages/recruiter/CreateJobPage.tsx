
import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Layers3,
  Clock3,
  Sparkles,
  FileText,
  Save,
  Send,
} from "lucide-react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const employmentTypes = [
  "Full Time",
  "Part Time",
  "Internship",
  "Contract",
  "Remote",
];

const experienceLevels = [
  "Fresh",
  "Junior",
  "Mid Level",
  "Senior",
  "Lead",
];

const CreateJobPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "Full Time",
    experienceLevel: "Junior",
    salaryMin: "",
    salaryMax: "",
    skills: "",
    description: "",
    responsibilities: "",
    requirements: "",
    aiMatching: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      aiMatching: !prev.aiMatching,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(formData);

    // Backend integration later
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={pageVariants}
      className="min-h-screen bg-[#FBF7F1] px-6 py-10"
    >
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <motion.div variants={fadeUp}>
          <DashboardHeader />
        </motion.div>

        {/* Page Intro */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)]"
        >
          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A6764B]/10">
              <Briefcase
                className="h-8 w-8 text-[#A6764B]"
              />
            </div>

            <div>
              <h1 className="font-serif text-3xl font-semibold text-[#3D2B1F]">
                Create New Job
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-[#6B5847]">
                Fill in the details below to publish a new
                opportunity. SmartHire AI will automatically
                analyze resumes and recommend the strongest
                candidates.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Basic Information */}
          <div className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)]">

            <h2 className="mb-8 font-serif text-2xl font-semibold text-[#3D2B1F]">
              Basic Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Job Title */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3D2B1F]">
                  <Briefcase className="h-4 w-4" />
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition focus:border-[#A6764B]"
                />
              </div>

              {/* Company */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3D2B1F]">
                  <Building2 className="h-4 w-4" />
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="SmartHire AI"
                  className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition focus:border-[#A6764B]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3D2B1F]">
                  <MapPin className="h-4 w-4" />
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Karachi, Pakistan"
                  className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition focus:border-[#A6764B]"
                />
              </div>

              {/* Employment Type */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3D2B1F]">
                  <Clock3 className="h-4 w-4" />
                  Employment Type
                </label>

                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition focus:border-[#A6764B]"
                >
                  {employmentTypes.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3D2B1F]">
                  <Layers3 className="h-4 w-4" />
                  Experience Level
                </label>

                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition focus:border-[#A6764B]"
                >
                  {experienceLevels.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3D2B1F]">
                  <DollarSign className="h-4 w-4" />
                  Salary Range (PKR)
                </label>

                <div className="grid grid-cols-2 gap-3">

                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="50000"
                    className="rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition focus:border-[#A6764B]"
                  />

                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="120000"
                    className="rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition focus:border-[#A6764B]"
                  />

                </div>
              </div>

            </div>
          </div>
                    {/* Job Details */}
          <div className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)]">

            <h2 className="mb-8 font-serif text-2xl font-semibold text-[#3D2B1F]">
              Job Details
            </h2>

            {/* Skills */}
            <div className="mb-6">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3D2B1F]">
                <Sparkles className="h-4 w-4" />
                Required Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, TypeScript, FastAPI, PostgreSQL"
                className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition focus:border-[#A6764B]"
              />

              <p className="mt-2 text-xs text-[#8A7A6C]">
                Separate skills using commas.
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#3D2B1F]">
                <FileText className="h-4 w-4" />
                Job Description
              </label>

              <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the position, company culture, and what the candidate will work on..."
                className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition resize-none focus:border-[#A6764B]"
              />
            </div>

            {/* Responsibilities */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#3D2B1F]">
                Responsibilities
              </label>

              <textarea
                rows={5}
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="- Develop scalable web applications&#10;- Collaborate with UI/UX team&#10;- Participate in code reviews"
                className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition resize-none focus:border-[#A6764B]"
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#3D2B1F]">
                Requirements
              </label>

              <textarea
                rows={5}
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="- BS Computer Science or related field&#10;- 2+ years experience&#10;- Strong communication skills"
                className="w-full rounded-xl border border-[#3D2B1F]/15 px-4 py-3 outline-none transition resize-none focus:border-[#A6764B]"
              />
            </div>

          </div>

          {/* AI Resume Matching */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)]"
          >
            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#3D2B1F]">
                  AI Resume Matching
                </h2>

                <p className="mt-2 text-sm text-[#6B5847]">
                  Enable SmartHire AI to automatically analyze resumes,
                  rank candidates, and recommend the most suitable
                  applicants.
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggle}
                className={`relative flex h-8 w-16 items-center rounded-full transition-all ${
                  formData.aiMatching
                    ? "bg-[#A6764B]"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute h-6 w-6 rounded-full bg-white shadow transition-all ${
                    formData.aiMatching
                      ? "left-9"
                      : "left-1"
                  }`}
                />
              </button>

            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row sm:justify-end"
          >

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#3D2B1F]/15 bg-white px-6 py-3 font-medium text-[#3D2B1F] transition hover:border-[#A6764B]"
            >
              <Save className="h-5 w-5" />
              Save Draft
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#A6764B] px-8 py-3 font-semibold text-white transition hover:bg-[#8B5A2B]"
            >
              <Send className="h-5 w-5" />
              Publish Job
            </button>

          </motion.div>

        </motion.form>

      </div>
    </motion.div>
  );
};

export default CreateJobPage;