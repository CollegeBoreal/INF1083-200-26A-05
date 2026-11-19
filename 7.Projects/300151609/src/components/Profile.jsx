import { useMemo, useState } from 'react'
import Icon from './Icons'
import { LANGS, foodName, localeOf } from '../i18n'
import {
  ACTIVITIES,
  GOALS,
  bmr,
  computeTargets,
  dayTotals,
  tdee,
} from '../lib/nutrition'

export default function Profile({
  t,
  lang,
  profile,
  customFoods,
  log,
  byId,
  onSave,
  onLang,
  onDeleteCustomFood,
  onReset,
  onToast,
}) {
  const [form, setForm] = useState(() => ({
    ...profile,
    age: profile.age ?? 30,
    height: profile.height ?? 170,
    weight: profile.weight ?? 70,
    name: profile.name ?? '',
    targets: { ...profile.targets },
    useCustomTargets: !!profile.useCustomTargets,
  }))
  const [autoTargets, setAutoTargets] = useState(!profile.useCustomTargets)

  const recommended = useMemo(() => computeTargets(form), [form])
  const targets = autoTargets ? recommended : form.targets

  const daysLogged = useMemo(
    () => Object.values(log).filter((day) => dayTotals(day, byId).kcal > 0).length,
    [log, byId],
  )

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
  const setTarget = (key) => (e) => {
    const value = Math.max(0, Math.round(Number(e.target.value) || 0))
    setForm((prev) => ({
      ...prev,
      useCustomTargets: true,
      targets: { ...(autoTargets ? recommended : prev.targets), [key]: value },
    }))
  }

  function switchToAuto() {
    setAutoTargets(true)
    setForm((prev) => ({ ...prev, useCustomTargets: false }))
  }

  function switchToCustom() {
    setAutoTargets(false)
    setForm((prev) => ({ ...prev, useCustomTargets: true, targets: { ...recommended } }))
  }

  function submit(e) {
    e.preventDefault()
    const next = {
      ...form,
      name: String(form.name || '').trim(),
      age: Number(form.age) || 0,
      height: Number(form.height) || 0,
      weight: Number(form.weight) || 0,
      useCustomTargets: !autoTargets,
      targets,
    }
    onSave(next)
    setForm(next)
    onToast(t('profile.saved'))
  }

  return (
    <div className="screen screen-profile">
      <header className="page-head">
        <div>
          <p className="eyebrow">
            {t('profile.loggedDays')} · {daysLogged}
          </p>
          <h1>{t('profile.title')}</h1>
          <p className="page-sub">{t('profile.subtitle')}</p>
        </div>
        <button type="submit" form="profile-form" className="btn btn-primary head-cta">
          <Icon name="check" size={17} />
          {t('common.save')}
        </button>
      </header>

      <form id="profile-form" className="profile-form" onSubmit={submit}>
        <section className="card">
          <div className="card-title">
            <h2>{t('profile.info')}</h2>
          </div>

          <div className="form-grid">
            <label className="field span-2">
              <span className="field-label">
                {t('profile.name')} <em>({t('common.optional')})</em>
              </span>
              <input type="text" value={form.name} onChange={set('name')} placeholder={t('onboard.namePlaceholder')} />
            </label>

            <div className="field span-2">
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
          </div>

          <div className="energy-row">
            <div className="energy-pill">
              <span>{t('profile.bmr')}</span>
              <strong>{new Intl.NumberFormat(localeOf(lang)).format(bmr(form))} kcal</strong>
            </div>
            <div className="energy-pill">
              <span>{t('profile.tdee')}</span>
              <strong>{new Intl.NumberFormat(localeOf(lang)).format(tdee(form))} kcal</strong>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-title">
            <h2>{t('profile.goal')}</h2>
          </div>
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

          <div className="card-subtitle-row">
            <h3>{t('profile.targets')}</h3>
            <div className="segmented small">
              <button type="button" className={autoTargets ? 'is-active' : ''} onClick={switchToAuto}>
                {t('profile.autoTargets')}
              </button>
              <button type="button" className={!autoTargets ? 'is-active' : ''} onClick={switchToCustom}>
                {t('profile.customTargets')}
              </button>
            </div>
          </div>

          <div className="form-grid targets-grid">
            <label className="field">
              <span className="field-label">{t('profile.kcalTarget')}</span>
              <input type="number" min="800" max="6000" value={Math.round(targets.kcal)} readOnly={autoTargets} required onChange={setTarget('kcal')} />
            </label>
            <label className="field">
              <span className="field-label">{t('profile.proteinTarget')}</span>
              <input type="number" min="0" max="400" value={Math.round(targets.protein)} readOnly={autoTargets} required onChange={setTarget('protein')} />
            </label>
            <label className="field">
              <span className="field-label">{t('profile.carbsTarget')}</span>
              <input type="number" min="0" max="800" value={Math.round(targets.carbs)} readOnly={autoTargets} required onChange={setTarget('carbs')} />
            </label>
            <label className="field">
              <span className="field-label">{t('profile.fatTarget')}</span>
              <input type="number" min="0" max="250" value={Math.round(targets.fat)} readOnly={autoTargets} required onChange={setTarget('fat')} />
            </label>
          </div>
          <p className="hint">
            <Icon name="info" size={14} />{' '}
            {t('profile.recommended', {
              kcal: recommended.kcal,
              p: recommended.protein,
            })}
          </p>
        </section>

        <section className="card">
          <div className="card-title">
            <h2>{t('profile.language')}</h2>
            <span className="muted">{t('profile.languageHint')}</span>
          </div>
          <div className="lang-grid">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className={`lang-option ${lang === l.code ? 'is-active' : ''}`}
                onClick={() => onLang(l.code)}
              >
                <span className="lang-name">{l.label}</span>
                <span className="lang-code">{l.short}</span>
                {lang === l.code && <Icon name="check" size={16} />}
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="card-title">
            <h2>{t('profile.customFoods')}</h2>
            <span className="muted">{customFoods.length}</span>
          </div>
          {customFoods.length === 0 ? (
            <p className="hint">{t('profile.noCustomFoods')}</p>
          ) : (
            <ul className="custom-list">
              {customFoods.map((f) => (
                <li key={f.id}>
                  <span className="food-emoji small" aria-hidden="true">{f.emoji}</span>
                  <span className="custom-main">
                    <span className="custom-name">{foodName(f, lang)}</span>
                    <span className="custom-meta">
                      {Math.round(f.per100.kcal)} {t('common.kcal')} · {t('foods.per100')}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="icon-btn danger"
                    onClick={() => onDeleteCustomFood(f.id)}
                    aria-label={`${t('common.delete')} ${foodName(f, lang)}`}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card danger-zone">
          <div className="card-title">
            <h2>{t('profile.data')}</h2>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm(t('profile.confirmReset'))) onReset()
            }}
          >
            <Icon name="trash" size={16} />
            {t('profile.reset')}
          </button>
        </section>

        <button type="submit" className="btn btn-primary btn-block save-bottom">
          <Icon name="check" size={17} />
          {t('common.save')}
        </button>
      </form>
    </div>
  )
}
