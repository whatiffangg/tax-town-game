const DashedPath = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline
        points="13,90 19.5,84 26,78 32.5,72 39,66"
        fill="none"
        stroke="white"
        strokeWidth="0.4"
        strokeDasharray="1.2 0.8"
        strokeLinecap="round"
        opacity="0"
      />
    </svg>
  );
};

export default DashedPath;
