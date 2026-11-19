import { useMemo } from 'react'
import MacroBar from './MacroBar'
import { dateKey, dayTotals, round, shiftDays } from '../lib/nutrition'

export default function Progress({ t, locale, profile, byId, log }) {
  const targets = profile.targets
  const nf = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }), [locale])
  const fmt = (n) => nf.format(Math.round(n))

  const days = useMemo(() => {
    const today = new Date()
    const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' })
    return Array.from({ length: 7 }, (_, i) => {
      const date = shiftDays(today, i - 6)
      const key = dateKey(date)
      return {
        key,
        date,
        isToday: i === 6,
        label: weekdayFmt.format(date),
        totals: dayTotals(log[key] || {}, byId),
      }
    })
  }, [log, byId, locale])

  const logged = days.filter((d) => d.totals.kcal > 0)
  const avg = (field) =>
    logged.length ? logged.reduce((sum, d) => sum + d.totals[field], 0) / logged.length : 0
  const avgKcal = avg('kcal')
  const avgProtein = avg('protein')
  const avgCarbs = avg('carbs')
  const avgFat = avg('fat')
  const weekTotal = days.reduce((sum, d) => sum + d.totals.kcal, 0)
  const onTarget = days.filter(
    (d) => d.totals.kcal > 0 && d.totals.kcal >= targets.kcal * 0.85 && d.totals.kcal <= targets.kcal * 1.05,
  ).length

  const maxKcal = Math.max(targets.kcal, ...days.map((d) => d.totals.kcal), 1)
  const scale = maxKcal * 1.1
  const targetPct = Math.min(96, (targets.kcal / scale) * 100)

  return (
    <div className="screen screen-progress">
      <header className="page-head">
        <div>
          <p className="eyebrow">
            {t('progress.days', { n: logged.length })}
          </p>
          <h1>{t('progress.title')}</h1>
          <p className="page-sub">{t('progress.subtitle')}</p>
        </div>
      </header>

      <div className="stat-grid">
        <div className="stat-card card">
          <span className="stat-label">{t('progress.average')}</span>
          <strong className="stat-value">{fmt(avgKcal)}</strong>
          <span className="stat-unit">{t('common.kcal')}</span>
        </div>
        <div className="stat-card card">
          <span className="stat-label">{t('progress.onTarget')}</span>
          <strong className="stat-value">{onTarget}<small> / 7</small></strong>
          <span className="stat-unit">{t('common.perDay')}</span>
        </div>
        <div className="stat-card card">
          <span className="stat-label">{t('progress.weekTotal')}</span>
          <strong className="stat-value">{fmt(weekTotal)}</strong>
          <span className="stat-unit">{t('common.kcal')}</span>
        </div>
        <div className="stat-card card">
          <span className="stat-label">{t('progress.proteinAvg')}</span>
          <strong className="stat-value">{fmt(avgProtein)}</strong>
          <span className="stat-unit">{t('common.g')}</span>
        </div>
      </div>

      {logged.length === 0 ? (
        <div className="empty-state card">
          <span className="empty-emoji" aria-hidden="true">📊</span>
          <p>{t('progress.noData')}</p>
        </div>
      ) : (
        <>
          <section className="card chart-card">
            <div className="card-title">
              <h2>{t('progress.kcalPerDay')}</h2>
              <span className="legend">
                <i className="legend-line" aria-hidden="true" />
                {t('progress.target')} · {fmt(targets.kcal)}
              </span>
            </div>

            <div className="chart-area">
              <div className="target-line" style={{ bottom: `${targetPct}%` }}>
                <span>{fmt(targets.kcal)}</span>
              </div>
              <div className="chart-cols">
                {days.map((d) => {
                  const h = d.totals.kcal > 0 ? Math.max(2, (d.totals.kcal / scale) * 100) : 0
                  const over = d.totals.kcal > targets.kcal * 1.05
                  return (
                    <div className="chart-col" key={d.key}>
                      <div
                        className={`chart-bar ${d.isToday ? 'is-today' : ''} ${over ? 'is-over' : ''} ${
                          d.totals.kcal === 0 ? 'is-empty' : ''
                        }`}
                        style={{ height: `${h}%` }}
                        title={`${d.label} · ${round(d.totals.kcal)} ${t('common.kcal')}`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="chart-days">
              {days.map((d) => (
                <div className={`chart-day ${d.isToday ? 'is-today' : ''}`} key={d.key}>
                  <span className="chart-dow">{d.label}</span>
                  <span className="chart-num">
                    {d.totals.kcal > 0 ? fmt(d.totals.kcal) : '—'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="card macro-avg-card">
            <div className="card-title">
              <h2>{t('progress.macros')}</h2>
              <span className="muted">{t('common.perDay')}</span>
            </div>
            <div className="macros">
              <MacroBar label={t('macro.protein')} value={avgProtein} target={targets.protein} color="var(--protein)" />
              <MacroBar label={t('macro.carbs')} value={avgCarbs} target={targets.carbs} color="var(--carbs)" />
              <MacroBar label={t('macro.fat')} value={avgFat} target={targets.fat} color="var(--fat)" />
            </div>
          </section>
        </>
      )}
    </div>
  )
}
