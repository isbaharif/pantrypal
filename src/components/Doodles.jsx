export function DoodlePot({ className = '' }) {
  return (
    <svg viewBox="0 0 70 105" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 30 L8 65 C8 75, 18 82, 35 82 C52 82, 62 75, 62 65 L62 30" />
      <path d="M4 30 L66 30" />
      <circle cx="35" cy="18" r="4" />
      <path d="M20 18 L50 18" />
      <path d="M8 40 L0 40 M62 40 L70 40" />
    </svg>
  )
}

export function DoodleBowl({ className = '' }) {
  return (
    <svg viewBox="0 0 80 90" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20 C5 55, 20 75, 40 75 C60 75, 75 55, 75 20" />
      <path d="M5 20 L75 20" />
      <path d="M55 5 L55 30 M50 5 C50 15, 60 15, 60 5" />
    </svg>
  )
}

export function DoodleRecipeCard({ className = '' }) {
  return (
    <svg viewBox="0 0 70 90" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="60" height="80" rx="4" />
      <path d="M18 25 L52 25 M18 38 L52 38 M18 51 L40 51" />
      <circle cx="46" cy="62" r="8" />
    </svg>
  )
}

export function DoodleWhisk({ className = '' }) {
  return (
    <svg viewBox="0 0 70 170" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M35 5 C15 5, 5 30, 5 55 C5 80, 20 95, 35 95" />
      <path d="M35 5 C55 5, 65 30, 65 55 C65 80, 50 95, 35 95" />
      <path d="M35 5 L35 95" />
      <path d="M18 20 C25 45, 25 70, 18 85" />
      <path d="M52 20 C45 45, 45 70, 52 85" />
      <path d="M35 95 L35 140" />
      <rect x="28" y="140" width="14" height="30" rx="4" />
    </svg>
  )
}

export function DoodleChili({ className = '' }) {
  return (
    <svg viewBox="0 0 105 75" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20 C10 15, 25 5, 32 13" />
      <path d="M25 25 C50 35, 80 30, 95 55 C102 68, 92 78, 80 72 C55 60, 30 45, 25 25 Z" />
    </svg>
  )
}

export function DoodleScribble({ className = '' }) {
  return (
    <svg viewBox="0 0 160 20" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 12 C 20 4, 35 18, 50 10 S 80 4, 95 12 S 125 18, 140 8 S 155 12, 156 10" />
    </svg>
  )
}

export function DoodleBackground() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="doodle-pattern"
          x="0"
          y="0"
          width="220"
          height="220"
          patternUnits="userSpaceOnUse"
        >
          <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-ink/[0.06]">
            <g transform="translate(10,10) rotate(-8)">
              <path d="M8 20 L8 45 C8 52, 15 57, 26 57 C37 57, 44 52, 44 45 L44 20" />
              <path d="M5 20 L47 20" />
              <circle cx="26" cy="12" r="3" />
            </g>
            <g transform="translate(110,30) rotate(10)">
              <path d="M14 10 C7 7, 17 1, 21 6" />
              <path d="M16 13 C32 20, 52 17, 61 33 C65 40, 59 46, 51 42 C36 34, 20 25, 16 13 Z" />
            </g>
            <g transform="translate(40,110) rotate(6)">
              <path d="M3 12 C3 33, 12 45, 24 45 C36 45, 45 33, 45 12" />
              <path d="M3 12 L45 12" />
            </g>
            <g transform="translate(140,140) rotate(-12)">
              <rect x="0" y="0" width="36" height="46" rx="3" />
              <path d="M8 13 L28 13 M8 20 L28 20 M8 27 L20 27" />
            </g>
            <g transform="translate(180,80) rotate(20)">
              <path d="M6 4 C6 30, 12 40, 12 55 M6 4 C3 4, 3 12, 6 12 M6 4 C9 4, 9 12, 6 12" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#doodle-pattern)" />
    </svg>
  )
}