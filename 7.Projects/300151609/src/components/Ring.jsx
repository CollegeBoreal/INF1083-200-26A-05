import { useId } from 'react'

export default function Ring({ value, max, size = 224, stroke = 18, over = false, children }) {
  const rawId = useId()
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '')
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0
  const center = size / 2

  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="ring-svg">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={over ? '#d0683d' : '#14a075'} />
            <stop offset="100%" stopColor={over ? '#e3a83c' : '#0a4c38'} />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="var(--ring-track)"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={`url(#grad-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * ratio} ${c}`}
          className="ring-progress"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="ring-content">{children}</div>
    </div>
  )
}
