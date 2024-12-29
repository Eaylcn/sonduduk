export default function DefaultTeamLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-full h-full"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6v2M12 16v2M8 12h2m4 0h2"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        strokeWidth={1.5}
      />
    </svg>
  );
} 