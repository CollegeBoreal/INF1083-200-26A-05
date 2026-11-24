import { useMemo } from 'react'
import Ring from './Ring'
import MacroBar from './MacroBar'
import Icon from './Icons'
import { MEALS, dateKey, dayTotals, defaultMealForNow, mealTotals, round } from '../lib/nutrition'
import { foodName } from '../i18n'

const MEAL_EMOJI = { breakfast: '☕', lunch: '🍲', dinner: '🥘', snack: '🍎' }

export default function Today({ t, lang, locale, profile, byId, log, onOpenPicker, onRemove }) {
  const key = dateKey()
  const day = log[key] || {}
  const totals = useMemo(() => dayTotals(day, byId), [day, byId])
  const targets = profile.targets

  const nf = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }), [locale])
  const fmt = (n) => nf.format(Math.round(n))

  const remaining = Math.round(targets.kcal - totals.kcal)
  const over = remaining < 0
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? t('greet.morning') : hour < 18 ? t('greet.afternoon') : t('greet.evening')
  const fullDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return (
    <div className="screen screen-today">
      <header className="page-head">
        <div>
          <p className="eyebrow">{fullDate}</p>
          <h1>
            {greeting}
            {profile.name ? `, ${profile.name}` : ''}
          </h1>
          <p className="page-sub">
            {profile.name ? t('today.motivation', { name: profile.name }) : t('today.subtitle')}
          </p>
        </div>
        <button type="button" className="btn btn-primary head-cta" onClick={() => onOpenPicker(defaultMealForNow())}>
          <Icon name="plus" size={17} />
          {t('today.quickAdd')}
        </button>
      </header>

      <section className="hero card" aria-label={t('today.title')}>
        <div className="hero-ring-col">
          <Ring value={totals.kcal} max={targets.kcal} over={over} size={214} stroke={17}>
            <span className={`ring-kcal ${over ? 'over' : ''}`}>{fmt(Math.abs(remaining))}</span>
            <span className="ring-label">{over ? t('today.over') : t('today.remaining')}</span>
            <span className="ring-unit">{t('common.kcal')}</span>
          </Ring>
          <div className="hero-pills">
            <div className="pill">
              <span>{t('today.consumed')}</span>
              <strong>{fmt(totals.kcal)}</strong>
            </div>
            <div className="pill">
              <span>{t('today.goal')}</span>
              <strong>{fmt(targets.kcal)}</strong>
            </div>
          </div>
        </div>

        <div className="hero-macro-col">
          <div className="card-title">
            <h2>{t('today.macros')}</h2>
            <span className="muted">{t('common.perDay')}</span>
          </div>
          <div className="macros">
            <MacroBar label={t('macro.protein')} value={totals.protein} target={targets.protein} color="var(--protein)" />
            <MacroBar label={t('macro.carbs')} value={totals.carbs} target={targets.carbs} color="var(--carbs)" />
            <MacroBar label={t('macro.fat')} value={totals.fat} target={targets.fat} color="var(--fat)" />
          </div>
          <div className="hero-note">
            <Icon name="info" size={15} />
            <span>{t('progress.target')} · {fmt(targets.kcal)} {t('common.kcal')}</span>
          </div>
        </div>
      </section>

      <div className="section-head">
        <h2>{t('today.log')}</h2>
      </div>

      <div className="meals">
        {MEALS.map((meal) => {
          const entries = day[meal] || []
          const total = mealTotals(entries, byId)
          return (
            <section className="meal-card card" key={meal}>
              <header className="meal-head">
                <div className="meal-title">
                  <span className="meal-emoji" aria-hidden="true">{MEAL_EMOJI[meal]}</span>
                  <div>
                    <h3>{t(`meal.${meal}`)}</h3>
                    <span className="meal-sub">
                      {entries.length ? t('today.items', { n: entries.length }) : t('today.empty')}
                    </span>
                  </div>
                </div>
                <div className="meal-actions">
                  <span className="meal-kcal">{fmt(total.kcal)} <small>kcal</small></span>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onOpenPicker(meal)}
                    aria-label={t('today.addTo', { meal: t(`meal.${meal}`) })}
                  >
                    <Icon name="plus" size={16} />
                  </button>
                </div>
              </header>

              {entries.length === 0 ? (
                <button type="button" className="meal-empty" onClick={() => onOpenPicker(meal)}>
                  <Icon name="plus" size={15} />
                  {t('today.addTo', { meal: t(`meal.${meal}`) })}
                </button>
              ) : (
                <ul className="entry-list">
                  {entries.map((entry) => {
                    const food = byId[entry.foodId]
                    if (!food) return null
                    const ratio = entry.grams / 100
                    const kcal = round(food.per100.kcal * ratio)
                    return (
                      <li className="entry" key={entry.id}>
                        <span className="entry-emoji" aria-hidden="true">{food.emoji}</span>
                        <div className="entry-main">
                          <span className="entry-name">{foodName(food, lang)}</span>
                          <span className="entry-meta">
                            {entry.grams} {food.liquid ? t('common.ml') : t('common.g')}
                            <span className="dot-sep">•</span>
                            {t('macroShort.protein')} {Math.round(food.per100.protein * ratio)}
                            {' · '}
                            {t('macroShort.carbs')} {Math.round(food.per100.carbs * ratio)}
                            {' · '}
                            {t('macroShort.fat')} {Math.round(food.per100.fat * ratio)}
                          </span>
                        </div>
                        <span className="entry-kcal">{fmt(kcal)}</span>
                        <button
                          type="button"
                          className="entry-remove"
                          onClick={() => onRemove(key, meal, entry.id)}
                          aria-label={`${t('common.delete')} ${foodName(food, lang)}`}
                          title={t('common.delete')}
                        >
                          <Icon name="close" size={14} />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
