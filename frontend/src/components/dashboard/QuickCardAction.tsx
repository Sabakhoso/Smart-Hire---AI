import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

/**
 * Reusable quick action card used on the dashboard.
 * If `href` is provided it navigates using React Router.
 * Otherwise it behaves like a normal button.
 */
const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon,
  href,
  onClick,
}) => {
  const cardContent = (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-transparent bg-white p-6 text-left shadow-[0_8px_24px_rgba(61,43,31,0.06)] transition-all duration-300 hover:border-[#A6764B]/40 hover:shadow-[0_16px_36px_rgba(61,43,31,0.12)]"
    >
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#A6764B]/10 text-[#8B5A2B] transition-colors duration-300 group-hover:bg-[#A6764B]/20">
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-[#3D2B1F]">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#6B5847]">
          {description}
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3D2B1F]/5 text-[#3D2B1F] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#3D2B1F] group-hover:text-white">
          <ArrowRight
            className="h-4 w-4"
            strokeWidth={2}
          />
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#A6764B]/40"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="block h-full w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[#A6764B]/40"
    >
      {cardContent}
    </button>
  );
};

export default QuickActionCard;