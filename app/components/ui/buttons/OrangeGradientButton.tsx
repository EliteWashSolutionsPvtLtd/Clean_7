import React from "react";

export default function OrangeGradientButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`group relative overflow-hidden select-none bg-gradient-to-l from-[#FF7700] via-[#FE922E] to-[#F8BB7A] shadow-[2px_2px_12.4px_-2px_#FD7801] hover:shadow-[4px_4px_20px_0px_rgba(139,90,43,0.4)] text-white font-medium cursor-pointer hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center justify-center gap-[5px]">
        {children}
      </span>
    </button>
  );
}
