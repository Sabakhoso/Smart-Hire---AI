// src/components/auth/RegisterForm.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff, Check } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  register as registerRequest,
} from "../../services/authService";

/**
 * Matches the real authService.ts: `register(payload)` is a named export
 * resolving with `{ token, user }`, and already calls saveToken()
 * internally. This form just hands the result to AuthContext.
 *
 * REMAINING ASSUMPTION: useAuth() exposes `login(user, token)` for
 * auto-login right after registration. Adjust if your context differs.
 */

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name is too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
     confirmPassword: z.string().min(1, "Please confirm your password"),

role: z.enum(["job_seeker", "recruiter"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const passwordChecks = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
];

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm<RegisterFormValues>({
  resolver: zodResolver(registerSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job_seeker",
  },
});
  
  const passwordValue = watch("password") ?? "";

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      // authService.register() already calls saveToken(data.token) internally
      const { user } = await registerRequest({
  full_name: values.name,
  email: values.email,
  password: values.password,
  role: values.role,
});
      // Sync AuthContext state (adjust if your context signature differs)
      console.log("Registered user:", user);

login(user);

if (user.role === "recruiter") {
  console.log("Navigating to recruiter dashboard...");
  navigate("/dashboard/recruiter/");
} else {
  console.log("Navigating to job seeker dashboard...");
  navigate("/dashboard");
  } }
      catch (error) {
      if (axios.isAxiosError(error)) {
        const detail =
          (error.response?.data as { detail?: string } | undefined)?.detail ??
          "Could not create your account. Please try again.";
        setServerError(detail);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-md rounded-2xl border border-[#3D2B1F]/10 bg-[#FFFDF9] p-8 shadow-[0_12px_32px_rgba(61,43,31,0.08)] sm:p-10"
    >
      <div className="mb-8 text-center">
        <h1 className="font-serif text-2xl font-semibold text-[#2E211A] sm:text-3xl">
          Create Your Account
        </h1>
        <p className="mt-2 text-sm text-[#6B5847]">
          Join SmartHire AI and hire smarter, get hired faster
        </p>
      </div>

      {serverError && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-6 rounded-xl border border-[#B3452E]/20 bg-[#B3452E]/[0.06] px-4 py-3 text-sm text-[#8C3823]"
        >
          {serverError}
        </motion.div>
      )}

      {/* Name */}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-[#3D2B1F]"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#2E211A] outline-none transition-colors duration-200 placeholder:text-[#A69787] focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/15 ${
            errors.name ? "border-[#B3452E]/60" : "border-[#3D2B1F]/15"
          }`}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-[#B3452E]">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-[#3D2B1F]"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#2E211A] outline-none transition-colors duration-200 placeholder:text-[#A69787] focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/15 ${
            errors.email ? "border-[#B3452E]/60" : "border-[#3D2B1F]/15"
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-[#B3452E]">
            {errors.email.message}
          </p>
        )}
      </div>
      {/* Role */}
<div className="mb-5">
  <label
    htmlFor="role"
    className="mb-1.5 block text-sm font-medium text-[#3D2B1F]"
  >
    Register As
  </label>

  <select
    id="role"
    className="w-full rounded-xl border border-[#3D2B1F]/15 bg-white px-4 py-3 text-sm text-[#2E211A] outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/15"
    {...register("role")}
  >
    <option value="job_seeker">Job Seeker</option>
    <option value="recruiter">Recruiter</option>
  </select>

  {errors.role && (
    <p className="mt-1.5 text-xs text-[#B3452E]">
      {errors.role.message}
    </p>
  )}
</div>
       

      {/* Password */}
      <div className="mb-5">
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-[#3D2B1F]"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-[#2E211A] outline-none transition-colors duration-200 placeholder:text-[#A69787] focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/15 ${
              errors.password ? "border-[#B3452E]/60" : "border-[#3D2B1F]/15"
            }`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7A6C] transition-colors hover:text-[#3D2B1F]"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5" />
            ) : (
              <Eye className="h-4.5 w-4.5" />
            )}
          </button>
        </div>

        {passwordValue.length > 0 && (
          <ul className="mt-2.5 flex flex-col gap-1">
            {passwordChecks.map((check) => {
              const passed = check.test(passwordValue);
              return (
                <li
                  key={check.label}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    passed ? "text-[#4B7A4A]" : "text-[#A69787]"
                  }`}
                >
                  <Check
                    className={`h-3.5 w-3.5 ${passed ? "opacity-100" : "opacity-30"}`}
                  />
                  {check.label}
                </li>
              );
            })}
          </ul>
        )}

        {errors.password && (
          <p id="password-error" className="mt-1.5 text-xs text-[#B3452E]">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="mb-1.5 block text-sm font-medium text-[#3D2B1F]"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
            className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-[#2E211A] outline-none transition-colors duration-200 placeholder:text-[#A69787] focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/15 ${
              errors.confirmPassword
                ? "border-[#B3452E]/60"
                : "border-[#3D2B1F]/15"
            }`}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7A6C] transition-colors hover:text-[#3D2B1F]"
            aria-label={
              showConfirmPassword ? "Hide password" : "Show password"
            }
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4.5 w-4.5" />
            ) : (
              <Eye className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p
            id="confirmPassword-error"
            className="mt-1.5 text-xs text-[#B3452E]"
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D2B1F] px-6 py-3.5 text-sm font-semibold text-[#FBF7F1] shadow-lg shadow-[#3D2B1F]/20 transition-all duration-300 hover:bg-[#2E211A] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5A2B]"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Creating account..." : "Create Account"}
      </button>

      <p className="mt-8 text-center text-sm text-[#6B5847]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#8B5A2B] transition-colors hover:text-[#3D2B1F]"
        >
          Sign in
        </Link>
      </p>
    </motion.form>
  );
};

export default RegisterForm;