export default function ServicesSvg() {
  return (
    <>
      {/* Mobile SVG - less curve */}
      <svg
        viewBox="0 0 31 25"
        preserveAspectRatio="none"
        className="w-full h-[750px] sm:h-[780px] absolute top-0 left-0 z-[-1] md:hidden"
      >
        <path d="M 0 0 L 31 0 L 31 15 C 23 16 8 17 0 16 L 0 0" fill="#f7f3ef" />
      </svg>

      {/* Desktop SVG - original curve */}
      <svg
        viewBox="0 0 31 25"
        preserveAspectRatio="none"
        className="w-full h-[620px] lg:h-[630px] absolute top-0 left-0 z-[-1] hidden md:block"
      >
        <path d="M 0 0 L 31 0 L 31 13 C 23 17 8 21 0 17 L 0 0" fill="#f7f3ef" />
      </svg>
    </>
  );
}
