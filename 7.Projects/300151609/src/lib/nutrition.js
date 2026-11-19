export const MEALS = ['breakfast', 'lunch', 'dinner', 'snack']

export const ACTIVITIES = [
  { id: 'sedentary', factor: 1.2 },
  { id: 'light', factor: 1.375 },
  { id: 'moderate', factor: 1.55 },
  { id: 'active', factor: 1.725 },
  { id: 'veryActive', factor: 1.9 },
]

export const GOALS = ['lose', 'maintain', 'gain']

export function dateKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function shiftDays(d, n) {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + n)
  return copy
}

/** Mifflin–St Jeor basal metabolic rate. */
export function bmr({ sex, age, height, weight }) {
  const base = 10 * Number(weight || 0) + 6.25 * Number(height || 0) - 5 * Number(age || 0)
  return Math.round(sex === 'female' ? base - 161 : base + 5)
}

export function tdee(profile) {
  const act = ACTIVITIES.find((a) => a.id === profile?.activity) || ACTIVITIES[2]
  return Math.round(bmr(profile) * act.factor)
}

/** Derive daily calorie + macro targets from the profile. */
export function computeTargets(profile) {
  const expenditure = tdee(profile)
  const weight = Number(profile?.weight) || 70
  let kcal = expenditure
  if (profile?.goal === 'lose') kcal = expenditure - 450
  if (profile?.goal === 'gain') kcal = expenditure + 350
  kcal = Math.max(1200, Math.round(kcal / 10) * 10)

  const proteinPerKg = profile?.goal === 'lose' ? 1.9 : profile?.goal === 'gain' ? 1.8 : 1.6
  const protein = Math.round(weight * proteinPerKg)
  const fat = Math.round((kcal * 0.28) / 9)
  const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4))

  return { kcal, protein, carbs, fat }
}

export function emptyTotals() {
  return { kcal: 0, protein: 0, carbs: 0, fat: 0 }
}

export function addMacros(a, b) {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
  }
}

/** Nutrition for one entry, scaled from the food's per-100 g values. */
export function entryMacros(entry, byId) {
  const food = byId[entry.foodId]
  if (!food || !(entry.grams > 0)) return emptyTotals()
  const ratio = entry.grams / 100
  return {
    kcal: food.per100.kcal * ratio,
    protein: food.per100.protein * ratio,
    carbs: food.per100.carbs * ratio,
    fat: food.per100.fat * ratio,
  }
}

export function dayTotals(day = {}, byId = {}) {
  let totals = emptyTotals()
  for (const meal of MEALS) {
    for (const entry of day?.[meal] || []) {
      totals = addMacros(totals, entryMacros(entry, byId))
    }
  }
  return totals
}

export function mealTotals(entries = [], byId = {}) {
  return entries.reduce((acc, e) => addMacros(acc, entryMacros(e, byId)), emptyTotals())
}

export function round(n, digits = 0) {
  const f = 10 ** digits
  return Math.round(n * f) / f
}

export function pct(value, max) {
  if (!max) return 0
  return Math.min(1, Math.max(0, value / max))
}

export function makeId(prefix = 'e') {
  const rand = Math.random().toString(36).slice(2, 9)
  return `${prefix}-${Date.now().toString(36)}-${rand}`
}

/** Localized "1 plate · 350 g" description of a food's typical serving. */
export function servingLabel(food, t) {
  if (!food) return ''
  const { grams, unit } = food.serving
  const u = food.liquid ? t('common.ml') : t('common.g')
  return `${t(`unit.${unit}`)} · ${grams} ${u}`
}

/** Best guess at which meal the user is logging right now. */
export function defaultMealForNow() {
  const h = new Date().getHours()
  if (h < 11) return 'breakfast'
  if (h < 15) return 'lunch'
  if (h < 21) return 'dinner'
  return 'snack'
}
