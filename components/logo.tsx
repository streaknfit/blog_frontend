export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Green arrow with sharper tail */}
      <path 
        d="M 17 95 Q 63 74 80 25 L 86 28 L 83 6 L 64 17 L 70 20 Q 54 69 17 95 Z"
        fill="#79fcb6"
        stroke="none"
      />

      {/* Sky blue swoosh with sharp left and bottom ends */}
      <path 
        d="M 29 59 C 58 39 60 79 48 93 Q 66 78 62 59 Q 71 48 73 29 Q 65 48 57 50 Q 42 40 29 59 Z"
        fill="#42a7f5"
        stroke="none"
      />

      {/* Blue circle for the head */}
      <circle 
        cx="52" 
        cy="38" 
        r="7" 
        fill="#42a7f5" 
      />
    </svg>
  )
} 