export default function FastworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0"
      {...props}
    >
      <rect width="100" height="100" rx="20" fill="#0E1649" />
      <path
        d="M60 25 H45 C35 25 30 30 30 40 V45 H25 V55 H30 V80 H42 V55 H55 V45 H42 V42 C42 38 43 37 46 37 H60 V25 Z"
        fill="#00B2FF"
      />
    </svg>
  );
}
