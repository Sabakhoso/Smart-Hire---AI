// src/components/auth/LoginForm.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";
import {
  login as loginRequest,
  getCurrentUser,
} from "../../services/authService";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      // Login (stores JWT automatically)
      await loginRequest(values);

      // Fetch logged-in user
      const currentUser = await getCurrentUser();

      // Update AuthContext
      login(currentUser);

      // Redirect based on role
if (currentUser.role === "recruiter") {
  navigate("/recruiter/dashboard");
} else {
  navigate("/dashboard");
}
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail =
          (error.response?.data as { detail?: string } | undefined)?.detail ??
          "Invalid email or password.";

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
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-md rounded-2xl border border-[#3D2B1F]/10 bg-[#FFFDF9] p-8 shadow-[0_12px_32px_rgba(61,43,31,0.08)] sm:p-10"
    >
      <div className="mb-8 text-center">
        <h1 className="font-serif text-2xl font-semibold text-[#2E211A] sm:text-3xl">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-[#6B5847]">
          Sign in to continue to SmartHire AI
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
          aria-describedby={
            errors.email ? "email-error" : undefined
          }
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#2E211A] outline-none transition-colors duration-200 placeholder:text-[#A69787] focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/15 ${
            errors.email
              ? "border-[#B3452E]/60"
              : "border-[#3D2B1F]/15"
          }`}
          {...register("email")}
        />

        {errors.email && (
          <p
            id="email-error"
            className="mt-1.5 text-xs text-[#B3452E]"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div className="mb-2">
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
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password
                ? "password-error"
                : undefined
            }
            className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-[#2E211A] outline-none transition-colors duration-200 placeholder:text-[#A69787] focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/15 ${
              errors.password
                ? "border-[#B3452E]/60"
                : "border-[#3D2B1F]/15"
            }`}
            {...register("password")}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7A6C] transition-colors hover:text-[#3D2B1F]"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5" />
            ) : (
              <Eye className="h-4.5 w-4.5" />
            )}
          </button>
        </div>

        {errors.password && (
          <p
            id="password-error"
            className="mt-1.5 text-xs text-[#B3452E]"
          >
            {errors.password.message}
          </p>
        )}
      </div>
            <div className="mb-6 flex justify-end">
        <Link
          to="/forgot-password"
          className="text-xs font-medium text-[#8B5A2B] transition-colors hover:text-[#3D2B1F]"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D2B1F] px-6 py-3.5 text-sm font-semibold text-[#FBF7F1] shadow-lg shadow-[#3D2B1F]/20 transition-all duration-300 hover:bg-[#2E211A] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5A2B]"
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}

        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <p className="mt-8 text-center text-sm text-[#6B5847]">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#8B5A2B] transition-colors hover:text-[#3D2B1F]"
        >
          Create one
        </Link>
      </p>
    </motion.form>
  );
};

export default LoginForm;