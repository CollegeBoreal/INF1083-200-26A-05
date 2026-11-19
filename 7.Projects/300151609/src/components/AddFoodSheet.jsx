import { useEffect, useMemo, useState } from 'react'
import Icon from './Icons'
import { MEALS, servingLabel } from '../lib/nutrition'
import { foodName, normalize } from '../i18n'

export default function AddFoodSheet({ t, lang, foods, meal: initialMeal, food, onClose, onAdd }) {
  const [selected, setSelected] = useState(food || null)
  const [meal, setMeal] = useState(initialMeal || 'lunch')
  const [grams, setGrams] = useState(food ? food.serving.grams : 100)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [onClose])

  const results = useMemo(() => {
    const q = normalize(query)
    if (!q) return foods
    return foods.filter((f) =>
      normalize(`${f.names.fr} ${f.names.ar} ${f.names.en}`).includes(q),
    )
  }, [foods, query])

  const kcal = selected ? (selected.per100.kcal * grams) / 100 : 0
  const protein = selected ? (selected.per100.protein * grams) / 100 : 0
  const carbs = selected ? (selected.per100.carbs * grams) / 100 : 0
  const fat = selected ? (selected.per100.fat * grams) / 100 : 0
  const unit = selected?.liquid ? t('common.ml') : t('common.g')

  const quickMultiples = [0.5, 1, 1.5, 2]
  const canAdd = selected && grams > 0

  return (
    <div className="sheet-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={t('sheet.pickTitle')}>
        <div className="sheet-grab" aria-hidden="true" />
        <header className="sheet-head">
          <div>
            <p className="eyebrow">{t(`meal.${meal}`)}</p>
            <h2>{selected ? t('sheet.portion') : t('sheet.pickTitle')}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('common.close')}>
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className="sheet-body">
          {!selected ? (
            <>
              <label className="searchbar">
                <Icon name="search" size={18} />
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('sheet.searchIn')}
                  aria-label={t('foods.search')}
                />
              </label>

              <ul className="pick-list">
                {results.map((f) => {
                  const servingKcal = Math.round((f.per100.kcal * f.serving.grams) / 100)
                  return (
                    <li key={f.id}>
                      <button
                        type="button"
                        className="pick-row"
                        onClick={() => {
                          setSelected(f)
                          setGrams(f.serving.grams)
                        }}
                      >
                        <span className="food-emoji" aria-hidden="true">{f.emoji}</span>
                        <span className="pick-main">
                          <span className="pick-name">{foodName(f, lang)}</span>
                          <span className="pick-meta">
                            {servingLabel(f, t)} · {servingKcal} {t('common.kcal')}
                          </span>
                        </span>
                        <span className="pick-plus" aria-hidden="true">
                          <Icon name="plus" size={15} />
                        </span>
                      </button>
                    </li>
                  )
                })}
                {results.length === 0 && (
                  <li className="empty-note">{t('foods.noResult', { q: query })}</li>
                )}
              </ul>
            </>
          ) : (
            <>
              <div className="food-selected">
                <span className="food-emoji big" aria-hidden="true">{selected.emoji}</span>
                <div className="food-selected-main">
                  <h3>{foodName(selected, lang)}</h3>
                  <p className="muted">
                    {servingLabel(selected, t)} · {Math.round(selected.per100.kcal)} {t('common.kcal')}{' '}
                    {selected.liquid ? t('foods.per100ml') : t('foods.per100')}
                  </p>
                </div>
                {!food && (
                  <button
                    type="button"
                    className="icon-btn subtle"
                    onClick={() => setSelected(null)}
                    aria-label={t('common.back')}
                  >
                    <Icon name="chevronLeft" size={18} className="icon-flip" />
                  </button>
                )}
              </div>

              <div className="portion-block">
                <label htmlFor="grams-input" className="field-label">
                  {t('sheet.portion')}
                </label>
                <div className="grams-row">
                  <div className="grams-input">
                    <input
                      id="grams-input"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="2000"
                      value={grams}
                      onChange={(e) => setGrams(Math.max(0, Math.min(2000, Number(e.target.value) || 0)))}
                    />
                    <span>{unit}</span>
                  </div>
                  <div className="quick-chips">
                    {quickMultiples.map((m) => {
                      const g = Math.min(2000, Math.round(selected.serving.grams * m))
                      const active = grams === g
                      return (
                        <button
                          key={m}
                          type="button"
                          className={`chip small ${active ? 'is-active' : ''}`}
                          onClick={() => setGrams(g)}
                        >
                          {m}×
                        </button>
                      )
                    })}
                  </div>
                </div>
                <p className="hint">
                  {t('sheet.quick')} · {selected.serving.grams} {unit}
                </p>
              </div>

              <div className="preview-grid">
                <div className="preview-cell kcal">
                  <strong>{Math.round(kcal)}</strong>
                  <span>{t('common.kcal')}</span>
                </div>
                <div className="preview-cell">
                  <strong>{Math.round(protein)}</strong>
                  <span>{t('macro.protein')} ({t('common.g')})</span>
                </div>
                <div className="preview-cell">
                  <strong>{Math.round(carbs)}</strong>
                  <span>{t('macro.carbs')} ({t('common.g')})</span>
                </div>
                <div className="preview-cell">
                  <strong>{Math.round(fat)}</strong>
                  <span>{t('macro.fat')} ({t('common.g')})</span>
                </div>
              </div>

              <div className="field">
                <span className="field-label">{t('sheet.meal')}</span>
                <div className="segmented four">
                  {MEALS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={meal === m ? 'is-active' : ''}
                      onClick={() => setMeal(m)}
                    >
                      {t(`meal.${m}`)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block"
                disabled={!canAdd}
                onClick={() =>
                  onAdd({
                    foodId: selected.id,
                    grams: Math.round(grams),
                    meal,
                  })
                }
              >
                <Icon name="plus" size={17} />
                {t('sheet.addToDiary')} · {Math.round(kcal)} {t('common.kcal')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
