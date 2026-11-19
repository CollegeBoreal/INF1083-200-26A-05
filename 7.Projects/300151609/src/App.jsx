import { useEffect, useMemo, useState } from 'react'
import { FOODS } from './data/foods'
import { LANGS, makeT, dirOf, localeOf } from './i18n'
import { computeTargets, dateKey, makeId } from './lib/nutrition'
import { Icon, Logo } from './components/Icons'
import Onboarding from './components/Onboarding'
import Today from './components/Today'
import Foods from './components/Foods'
import Progress from './components/Progress'
import Profile from './components/Profile'
import AddFoodSheet from './components/AddFoodSheet'

const STORAGE_KEY = 'sahha.v1'

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

const TABS = [
  { id: 'today', icon: 'today' },
  { id: 'foods', icon: 'foods' },
  { id: 'progress', icon: 'progress' },
  { id: 'profile', icon: 'profile' },
]

export default function App() {
  const [initial] = useState(loadState)
  const [lang, setLang] = useState(initial.lang || 'fr')
  const [profile, setProfile] = useState(initial.profile || null)
  const [customFoods, setCustomFoods] = useState(initial.customFoods || [])
  const [log, setLog] = useState(initial.log || {})
  const [tab, setTab] = useState('today')
  const [picker, setPicker] = useState(null)
  const [toast, setToast] = useState('')

  const t = useMemo(() => makeT(lang), [lang])
  const locale = localeOf(lang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dirOf(lang)
  }, [lang])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, profile, customFoods, log }))
    } catch {
      /* storage may be full or blocked — the app still works in memory */
    }
  }, [lang, profile, customFoods, log])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  const foods = useMemo(() => [...FOODS, ...customFoods], [customFoods])
  const byId = useMemo(() => Object.fromEntries(foods.map((f) => [f.id, f])), [foods])

  function addEntry({ foodId, grams, meal, date }) {
    const key = date || dateKey()
    setLog((prev) => {
      const day = prev[key] || {}
      const entries = day[meal] || []
      return {
        ...prev,
        [key]: {
          ...day,
          [meal]: [...entries, { id: makeId(), foodId, grams: Math.round(grams) }],
        },
      }
    })
  }

  function removeEntry(dateKeyValue, meal, id) {
    setLog((prev) => {
      const day = prev[dateKeyValue]
      if (!day) return prev
      return {
        ...prev,
        [dateKeyValue]: {
          ...day,
          [meal]: (day[meal] || []).filter((e) => e.id !== id),
        },
      }
    })
  }

  function addCustomFood(food) {
    setCustomFoods((prev) => [...prev, food])
    setToast(t('custom.saved'))
  }

  function deleteCustomFood(id) {
    setCustomFoods((prev) => prev.filter((f) => f.id !== id))
    setLog((prev) => {
      const next = {}
      for (const [key, day] of Object.entries(prev)) {
        next[key] = {}
        for (const [meal, entries] of Object.entries(day)) {
          next[key][meal] = entries.filter((e) => e.foodId !== id)
        }
      }
      return next
    })
  }

  function saveProfile(next) {
    const targets = next.useCustomTargets ? next.targets : computeTargets(next)
    setProfile({ ...next, targets })
  }

  function resetAll() {
    setProfile(null)
    setCustomFoods([])
    setLog({})
    setLang('fr')
    setTab('today')
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  if (!profile) {
    return (
      <Onboarding
        lang={lang}
        onLang={setLang}
        t={t}
        onComplete={(data) => {
          setProfile({ ...data, targets: computeTargets(data) })
          setTab('today')
        }}
      />
    )
  }

  const screenProps = { t, lang, locale, profile, foods, byId, log, customFoods }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Logo size={44} />
          <div>
            <strong className="brand-name">{t('brand.name')}</strong>
            <span className="brand-tagline">{t('brand.tagline')}</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Navigation">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-btn ${tab === item.id ? 'is-active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <Icon name={item.icon} size={19} />
              <span>{t(`nav.${item.id}`)}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="lang-switch" role="group" aria-label={t('profile.language')}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className={lang === l.code ? 'is-active' : ''}
                onClick={() => setLang(l.code)}
              >
                {l.short}
              </button>
            ))}
          </div>
          <p className="sidebar-note">🇩🇿 {t('brand.tagline')}</p>
        </div>
      </aside>

      <div className="main">
        <header className="mobile-topbar">
          <div className="topbar-brand">
            <Logo size={34} />
            <strong>{t('brand.name')}</strong>
          </div>
          <div className="lang-switch compact" role="group" aria-label={t('profile.language')}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className={lang === l.code ? 'is-active' : ''}
                onClick={() => setLang(l.code)}
              >
                {l.short}
              </button>
            ))}
          </div>
        </header>

        <main className="content">
          {tab === 'today' && (
            <Today
              {...screenProps}
              onOpenPicker={(meal, foodId) => setPicker({ meal, foodId })}
              onRemove={removeEntry}
            />
          )}
          {tab === 'foods' && (
            <Foods
              {...screenProps}
              onOpenPicker={(meal, foodId) => setPicker({ meal, foodId })}
              onCreate={addCustomFood}
            />
          )}
          {tab === 'progress' && <Progress {...screenProps} />}
          {tab === 'profile' && (
            <Profile
              {...screenProps}
              onSave={saveProfile}
              onLang={setLang}
              onDeleteCustomFood={deleteCustomFood}
              onReset={resetAll}
              onToast={setToast}
            />
          )}
        </main>

        <nav className="bottom-nav" aria-label="Navigation">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={tab === item.id ? 'is-active' : ''}
              onClick={() => setTab(item.id)}
            >
              <Icon name={item.icon} size={21} />
              <span>{t(`nav.${item.id}`)}</span>
            </button>
          ))}
        </nav>
      </div>

      {picker && (
        <AddFoodSheet
          key={`${picker.meal}-${picker.foodId || 'pick'}`}
          t={t}
          lang={lang}
          locale={locale}
          foods={foods}
          meal={picker.meal}
          food={picker.foodId ? byId[picker.foodId] : null}
          onClose={() => setPicker(null)}
          onAdd={(payload) => {
            addEntry(payload)
            setPicker(null)
            setToast(t('sheet.added'))
          }}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
