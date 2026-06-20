import { GOOGLE_PLAY_URL } from "@/app/lib/store-links";
import GooglePlayIcon from "../../icons/GooglePlayIcon";

interface GooglePlayButtonProps {
  className?: string;
  href?: string;
}

export default function GooglePlayButton({
  className = "",
  href = GOOGLE_PLAY_URL,
}: GooglePlayButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex touch-manipulation select-none items-center gap-[12px] rounded-[25px] bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] px-[18px] sm:px-[22px] py-[12px] sm:py-[14px] shadow-[0_4px_15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 overflow-hidden cursor-pointer justify-center sm:justify-start transition-all duration-300 active:scale-[0.97] active:shadow-[0_2px_8px_rgba(0,0,0,0.45),inset_0_2px_6px_rgba(0,0,0,0.35)] active:border-white/15 md:hover:shadow-[0_6px_25px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15),0_0_20px_rgba(255,255,255,0.1)] md:hover:scale-[1.05] md:hover:border-white/20 md:before:absolute md:before:inset-0 md:before:rounded-[25px] md:before:bg-gradient-to-r md:before:from-transparent md:before:via-white/20 md:before:to-transparent md:before:translate-x-[-200%] md:hover:before:translate-x-[200%] md:before:transition-transform md:before:duration-1000 ${className}`}
    >
      <GooglePlayIcon className="w-[35px] sm:w-[41px] transition-transform duration-300 group-active:scale-105 md:group-hover:scale-110" />
      <div className="text-left relative z-10">
        <p className="text-[#999] text-[12px] sm:text-xs transition-colors duration-300 group-active:text-[#ccc] md:group-hover:text-[#ccc]">
          Get it on
        </p>
        <h3 className="font-semibold text-white text-[16px] sm:text-base">
          Google Play
        </h3>
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
    </a>
  );
}
