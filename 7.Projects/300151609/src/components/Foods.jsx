import { useMemo, useState } from 'react'
import Icon from './Icons'
import CustomFoodModal from './CustomFoodModal'
import { CATEGORIES } from '../data/foods'
import { foodName, normalize } from '../i18n'
import { defaultMealForNow, makeId, round, servingLabel } from '../lib/nutrition'

export default function Foods({ t, lang, foods, customFoods, onOpenPicker, onCreate }) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [createOpen, setCreateOpen] = useState(false)

  const categories = useMemo(
    () => ['all', ...CATEGORIES, ...(customFoods.length ? ['custom'] : [])],
    [customFoods.length],
  )

  const filtered = useMemo(() => {
    const q = normalize(query)
    return foods.filter((f) => {
      const inCat = cat === 'all' || f.category === cat
      if (!inCat) return false
      if (!q) return true
      return normalize(`${f.names.fr} ${f.names.ar} ${f.names.en}`).includes(q)
    })
  }, [foods, cat, query])

  const catLabel = (c) => (c === 'all' ? t('filter.all') : c === 'custom' ? t('foods.custom') : t(`cat.${c}`))

  function handleCreate(data) {
    onCreate({
      id: makeId('custom'),
      category: 'custom',
      custom: true,
      emoji: '🍽️',
      names: { fr: data.name, ar: data.name, en: data.name },
      per100: {
        kcal: data.kcal,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
      },
      serving: { grams: data.serving, unit: 'portion' },
      liquid: false,
    })
  }

  return (
    <div className="screen screen-foods">
      <header className="page-head">
        <div>
          <p className="eyebrow">{foods.length} · {t('filter.all')}</p>
          <h1>{t('foods.title')}</h1>
          <p className="page-sub">{t('foods.subtitle')}</p>
        </div>
        <button type="button" className="btn btn-ghost head-cta" onClick={() => setCreateOpen(true)}>
          <Icon name="sparkle" size={17} />
          {t('foods.create')}
        </button>
      </header>

      <label className="searchbar big">
        <Icon name="search" size={19} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('foods.search')}
          aria-label={t('foods.search')}
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => setQuery('')}
            aria-label={t('common.close')}
          >
            <Icon name="close" size={15} />
          </button>
        )}
      </label>

      <div className="chips scroll-x" role="tablist" aria-label={t('foods.title')}>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={cat === c}
            className={`chip ${cat === c ? 'is-active' : ''}`}
            onClick={() => setCat(c)}
          >
            {catLabel(c)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state card">
          <span className="empty-emoji" aria-hidden="true">🥘</span>
          <p>{t('foods.noResult', { q: query })}</p>
          <button type="button" className="btn btn-primary" onClick={() => setCreateOpen(true)}>
            <Icon name="plus" size={17} />
            {t('foods.create')}
          </button>
        </div>
      ) : (
        <ul className="food-list">
          {filtered.map((f) => {
            const ratio = f.serving.grams / 100
            const kcal = round(f.per100.kcal * ratio)
            return (
              <li key={f.id}>
                <button
                  type="button"
                  className="food-row"
                  onClick={() => onOpenPicker(defaultMealForNow(), f.id)}
                >
                  <span className="food-emoji" aria-hidden="true">{f.emoji}</span>
                  <span className="food-main">
                    <span className="food-name">
                      {foodName(f, lang)}
                      {f.custom && <span className="tag">{t('foods.custom')}</span>}
                    </span>
                    <span className="food-meta">
                      {servingLabel(f, t)} · <strong>{kcal}</strong> {t('common.kcal')}
                    </span>
                    <span className="food-meta muted">
                      {t('macroShort.protein')} {round(f.per100.protein * ratio, 1)}
                      {' · '}
                      {t('macroShort.carbs')} {round(f.per100.carbs * ratio, 1)}
                      {' · '}
                      {t('macroShort.fat')} {round(f.per100.fat * ratio, 1)}
                      {' g'}
                    </span>
                  </span>
                  <span className="food-add" aria-hidden="true">
                    <Icon name="plus" size={16} />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {createOpen && (
        <CustomFoodModal t={t} onClose={() => setCreateOpen(false)} onSave={handleCreate} />
      )}
    </div>
  )
}
