import { useEffect, useState } from 'react'
import Icon from './Icons'

export default function CustomFoodModal({ t, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    kcal: '',
    protein: '',
    carbs: '',
    fat: '',
    serving: '100',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  const num = (v) => Math.max(0, Number(v) || 0)

  function submit(e) {
    e.preventDefault()
    if (!form.name.trim() || form.kcal === '' || Number(form.kcal) < 0) {
      setError(t('custom.required'))
      return
    }
    onSave({
      name: form.name.trim(),
      kcal: num(form.kcal),
      protein: num(form.protein),
      carbs: num(form.carbs),
      fat: num(form.fat),
      serving: Math.max(1, num(form.serving) || 100),
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal-card" onSubmit={submit} role="dialog" aria-modal="true" aria-label={t('custom.title')}>
        <header className="sheet-head">
          <div>
            <p className="eyebrow">{t('custom.hint')}</p>
            <h2>{t('custom.title')}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('common.close')}>
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className="form-grid">
          <label className="field span-2">
            <span className="field-label">{t('custom.name')}</span>
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder={t('custom.namePlaceholder')}
              autoFocus
            />
          </label>

          <label className="field span-2">
            <span className="field-label">{t('custom.kcal')}</span>
            <input type="number" min="0" inputMode="numeric" value={form.kcal} onChange={update('kcal')} placeholder="0" />
          </label>

          <label className="field">
            <span className="field-label">{t('custom.protein')}</span>
            <input type="number" min="0" step="0.1" value={form.protein} onChange={update('protein')} placeholder="0" />
          </label>
          <label className="field">
            <span className="field-label">{t('custom.carbs')}</span>
            <input type="number" min="0" step="0.1" value={form.carbs} onChange={update('carbs')} placeholder="0" />
          </label>
          <label className="field">
            <span className="field-label">{t('custom.fat')}</span>
            <input type="number" min="0" step="0.1" value={form.fat} onChange={update('fat')} placeholder="0" />
          </label>
          <label className="field">
            <span className="field-label">{t('custom.serving')}</span>
            <input type="number" min="1" value={form.serving} onChange={update('serving')} placeholder="100" />
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {t('common.cancel')}
          </button>
          <button type="submit" className="btn btn-primary">
            <Icon name="check" size={17} />
            {t('common.save')}
          </button>
        </div>
      </form>
    </div>
  )
}
