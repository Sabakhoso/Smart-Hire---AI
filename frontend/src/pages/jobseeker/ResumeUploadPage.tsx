import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import UploadBox from "../../components/resume/UploadBox";
import UploadProgress from "../../components/resume/UploadProgress";
import EmptyResumeState from "../../components/resume/EmptyResumeState";

import { uploadResume } from "../../services/resumeService";

const ResumeUploadPage: React.FC = () => {
    const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [uploadedResumeId, setUploadedResumeId] = useState<number | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setSuccessMessage("");
    setErrorMessage("");
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setErrorMessage("");
      setSuccessMessage("");

      /**
       * Fake progress animation.
       * Backend currently doesn't expose upload progress,
       * so we simulate a smooth loading bar.
       */

      let value = 0;

      const timer = setInterval(() => {
        value += 10;

        if (value <= 90) {
          setProgress(value);
        }
      }, 150);

      const response = await uploadResume(selectedFile);

      setUploadedResumeId(response.id);

      clearInterval(timer);

      setProgress(100);

      setSuccessMessage(
        "Resume uploaded successfully. You can now analyze it."
      );
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while uploading."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">

      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EFE5D8] px-4 py-2 text-sm font-semibold text-[#8B5A2B]">
          <Sparkles className="h-4 w-4" />

          AI Resume Analysis
        </div>

        <h1 className="mt-5 font-serif text-4xl font-bold text-[#2E211A]">
          Upload Your Resume
        </h1>

        <p className="mt-3 max-w-2xl text-[#6B5847] leading-7">
          Upload your latest resume in PDF format and let SmartHire AI
          evaluate your ATS compatibility, resume quality, and generate
          personalized improvement suggestions.
        </p>
      </motion.div>
            {/* Upload Section */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="rounded-3xl border border-[#3D2B1F]/10 bg-white p-8 shadow-lg"
      >
        <UploadBox onFileSelect={handleFileSelect} />

        {selectedFile && (
          <div className="mt-8 rounded-2xl border border-[#3D2B1F]/10 bg-[#FBF7F1] p-5">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              {/* File Info */}

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3D2B1F]">
                  <FileText className="h-7 w-7 text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#2E211A]">
                    {selectedFile.name}
                  </h3>

                  <p className="text-sm text-[#6B5847]">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {/* Upload Button */}

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3D2B1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2B1E15] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Upload className="h-4 w-4" />

                {uploading ? "Uploading..." : "Upload Resume"}
              </button>

            </div>

            {/* Progress */}

            {(uploading || progress > 0) && (
              <div className="mt-6">
                <UploadProgress
                  progress={progress}
                  label={
                    uploading
                      ? "Uploading resume..."
                      : "Upload completed"
                  }
                />
              </div>
            )}

            {/* Success */}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />

                <p className="text-sm font-medium text-green-700">
                  {successMessage}
                </p>
              </motion.div>
            )}

            {/* Error */}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />

                <p className="text-sm font-medium text-red-700">
                  {errorMessage}
                </p>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
            {/* Next Step */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="rounded-3xl border border-[#3D2B1F]/10 bg-white p-8 shadow-lg"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left Content */}

          <div className="max-w-xl">
            <span className="rounded-full bg-[#EFE5D8] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#8B5A2B]">
              AI Resume Analysis
            </span>

            <h2 className="mt-5 font-serif text-3xl font-semibold text-[#2E211A]">
              Ready for an AI-powered resume review?
            </h2>

            <p className="mt-4 leading-7 text-[#6B5847]">
              Once your resume is uploaded successfully, SmartHire AI
              can analyze your resume, calculate your ATS score,
              identify missing skills, highlight strengths, and
              recommend improvements tailored to recruiters.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "ATS Compatibility Score",
                "Resume Strengths & Weaknesses",
                "Missing Skills Detection",
                "AI Career Recommendations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[#3D2B1F]"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#8B5A2B]" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Card */}

          <div className="w-full max-w-sm rounded-3xl border border-[#3D2B1F]/10 bg-[#FBF7F1] p-7">

            <h3 className="font-serif text-2xl font-semibold text-[#2E211A]">
              Analyze Resume
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#6B5847]">
              Continue to AI analysis after uploading your resume.
            </p>

            
                <button
  onClick={() => {
    console.log("Button clicked");
    console.log("Resume ID:", uploadedResumeId);

    navigate("/dashboard/analysis");
  }}
  disabled={!uploadedResumeId}
  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D2B1F] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#2B1E15] disabled:cursor-not-allowed disabled:opacity-50"
>
  Continue to Analysis
  <ArrowRight className="h-4 w-4" />
</button>
  


            {!uploadedResumeId && (
              <p className="mt-4 text-center text-xs text-[#8B5A2B]">
                Upload your resume first to continue.
              </p>
            )}
          </div>

        </div>
      </motion.div>
            {!selectedFile && (
        <div className="mt-10">
          <EmptyResumeState />
        </div>
      )}
    </div>
  );
};

export default ResumeUploadPage;