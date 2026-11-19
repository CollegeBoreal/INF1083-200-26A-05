import { useState } from 'react'
import Icon, { Logo } from './Icons'
import { LANGS } from '../i18n'
import { ACTIVITIES, GOALS, computeTargets } from '../lib/nutrition'

export default function Onboarding({ lang, onLang, t, onComplete }) {
  const [form, setForm] = useState({
    name: '',
    sex: 'female',
    age: '28',
    height: '168',
    weight: '68',
    activity: 'moderate',
    goal: 'maintain',
  })
  const [error, setError] = useState('')

  const recommended = computeTargets(form)
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  function submit(e) {
    e.preventDefault()
    const age = Number(form.age)
    const height = Number(form.height)
    const weight = Number(form.weight)
    if (!(age > 0 && height > 0 && weight > 0)) {
      setError(t('onboard.required'))
      return
    }
    onComplete({
      ...form,
      name: form.name.trim(),
      age,
      height,
      weight,
    })
  }

  return (
    <div className="onboard">
      <aside className="onboard-hero">
        <div className="onboard-brand">
          <Logo size={46} />
          <div>
            <strong>Sahha</strong>
            <span>صحّة</span>
          </div>
        </div>

        <div className="onboard-copy">
          <span className="onboard-badge">
            <span aria-hidden="true">🇩🇿</span> Algeria
          </span>
          <h1>{t('onboard.welcome')}</h1>
          <p>{t('onboard.lead')}</p>
          <ul className="onboard-features">
            <li><Icon name="check" size={16} /> {t('onboard.feature1')}</li>
            <li><Icon name="check" size={16} /> {t('onboard.feature2')}</li>
            <li><Icon name="check" size={16} /> {t('onboard.feature3')}</li>
          </ul>
        </div>

        <img className="onboard-art" src="/onboard-plate.png" alt="" aria-hidden="true" />
      </aside>

      <main className="onboard-main">
        <div className="onboard-main-inner">
          <div className="onboard-top">
            <span className="onboard-brand-mini">
              <Logo size={30} /> Sahha
            </span>
            <div className="lang-switch" role="group" aria-label={t('profile.language')}>
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={lang === l.code ? 'is-active' : ''}
                  onClick={() => onLang(l.code)}
                >
                  {l.short}
                </button>
              ))}
            </div>
          </div>

          <form className="onboard-card card" onSubmit={submit}>
            <div className="onboard-form-head">
              <p className="eyebrow">{t('onboard.step1')}</p>
              <h2>{t('onboard.formTitle')}</h2>
              <p className="page-sub">{t('onboard.formSub')}</p>
            </div>

            <div className="form-grid">
              <label className="field span-3">
                <span className="field-label">
                  {t('profile.name')} <em>({t('common.optional')})</em>
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder={t('onboard.namePlaceholder')}
                  autoComplete="given-name"
                />
              </label>

              <div className="field span-3">
                <span className="field-label">{t('profile.sex')}</span>
                <div className="segmented two">
                  <button
                    type="button"
                    className={form.sex === 'female' ? 'is-active' : ''}
                    onClick={() => setForm((p) => ({ ...p, sex: 'female' }))}
                  >
                    {t('profile.sexFemale')}
                  </button>
                  <button
                    type="button"
                    className={form.sex === 'male' ? 'is-active' : ''}
                    onClick={() => setForm((p) => ({ ...p, sex: 'male' }))}
                  >
                    {t('profile.sexMale')}
                  </button>
                </div>
              </div>

              <label className="field">
                <span className="field-label">
                  {t('profile.age')} <em>({t('profile.ageUnit')})</em>
                </span>
                <input type="number" required min="18" max="110" value={form.age} onChange={set('age')} />
              </label>
              <label className="field">
                <span className="field-label">
                  {t('profile.height')} <em>(cm)</em>
                </span>
                <input type="number" required min="100" max="230" value={form.height} onChange={set('height')} />
              </label>
              <label className="field">
                <span className="field-label">
                  {t('profile.weight')} <em>(kg)</em>
                </span>
                <input type="number" required min="30" max="250" step="0.5" value={form.weight} onChange={set('weight')} />
              </label>

              <label className="field span-3">
                <span className="field-label">{t('profile.activity')}</span>
                <select value={form.activity} onChange={set('activity')}>
                  {ACTIVITIES.map((a) => (
                    <option key={a.id} value={a.id}>
                      {t(`activity.${a.id}`)} — {t(`activity.${a.id}Hint`)}
                    </option>
                  ))}
                </select>
              </label>

              <div className="field span-3">
                <span className="field-label">{t('profile.goal')}</span>
                <div className="goal-grid">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`goal-option ${form.goal === g ? 'is-active' : ''}`}
                      onClick={() => setForm((p) => ({ ...p, goal: g }))}
                    >
                      <span className="goal-icon" aria-hidden="true">
                        {g === 'lose' ? '↓' : g === 'gain' ? '↑' : '≈'}
                      </span>
                      <span>{t(`goal.${g}`)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="onboard-preview">
              <div>
                <p className="preview-label">{t('onboard.yourTargets')}</p>
                <p className="preview-kcal">
                  <strong>{recommended.kcal}</strong>
                  <span>{t('common.kcal')} / {t('common.perDay')}</span>
                </p>
              </div>
              <div className="preview-macros">
                <span><i style={{ background: 'var(--protein)' }} />{t('macroShort.protein')} {recommended.protein}</span>
                <span><i style={{ background: 'var(--carbs)' }} />{t('macroShort.carbs')} {recommended.carbs}</span>
                <span><i style={{ background: 'var(--fat)' }} />{t('macroShort.fat')} {recommended.fat}</span>
              </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block">
              {t('onboard.start')}
              <Icon name="chevronLeft" size={17} className="icon-flip-rtl" />
            </button>

            <p className="onboard-privacy">{t('onboard.disclaimer')}</p>
            <p className="onboard-privacy">
              <Icon name="info" size={13} /> {t('onboard.privacy')}
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
