export default function MacroBar({ label, value, target, color, unit = 'g' }) {
  const safeTarget = target > 0 ? target : 0
  const ratio = safeTarget ? Math.min(1, value / safeTarget) : 0
  const over = safeTarget > 0 && value > safeTarget

  return (
    <div className={`macro ${over ? 'is-over' : ''}`}>
      <div className="macro-head">
        <span className="macro-name">
          <span className="macro-dot" style={{ background: color }} />
          {label}
        </span>
        <span className="macro-value">
          <strong>{Math.round(value)}</strong>
          <span className="macro-target">
            {' / '}
            {Math.round(safeTarget)} {unit}
          </span>
        </span>
      </div>
      <div
        className="bar"
        role="progressbar"
        aria-valuenow={Math.min(Math.round(value), Math.round(safeTarget))}
        aria-valuemin={0}
        aria-valuemax={Math.max(1, Math.round(safeTarget))}
        aria-label={label}
        aria-valuetext={`${Math.round(value)} / ${Math.round(safeTarget)} ${unit}`}
      >
        <span className="bar-fill" style={{ width: `${ratio * 100}%`, background: color }} />
      </div>
    </div>
  )
}
