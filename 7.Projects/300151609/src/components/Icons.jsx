export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '' }) {
  const paths = {
    today: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </>
    ),
    foods: (
      <>
        <path d="M7 3v7a2 2 0 0 0 4 0V3" />
        <path d="M9 12v9" />
        <path d="M17 3c-1.5 2-2 4-2 6 0 2 1 3 2 3s2-1 2-3c0-2-.5-4-2-6z" />
        <path d="M17 12v9" />
      </>
    ),
    progress: (
      <>
        <path d="M5 20v-8M12 20V4M19 20v-5" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    trash: (
      <>
        <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
        <path d="M10 11v5M14 11v5" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </>
    ),
    chevronLeft: <path d="M15 6l-6 6 6 6" />,
    check: <path d="M5 13l4 4L19 7" />,
    sparkle: (
      <path d="M12 3l1.8 4.9L18.5 9.7l-4.7 1.8L12 16.4l-1.8-4.9L5.5 9.7l4.7-1.8z" />
    ),
    flame: (
      <path d="M12 3c1 4 5 5 5 9a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 1-3 0-5 1-8z" />
    ),
    scale: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M9 10h6M12 10v5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
  }

  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || null}
    </svg>
  )
}

export function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logoGrad" x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#128a63" />
          <stop offset="1" stopColor="#0a4c38" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#logoGrad)" />
      <path
        d="M31.5 13a12 12 0 1 0 0 22 14.5 14.5 0 0 1 0-22z"
        fill="#f3dba6"
      />
      <circle cx="33.2" cy="18.4" r="2.1" fill="#f3dba6" />
    </svg>
  )
}

export { Icon }
