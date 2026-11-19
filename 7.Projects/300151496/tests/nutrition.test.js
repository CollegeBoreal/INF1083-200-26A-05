import test from 'node:test'
import assert from 'node:assert/strict'
import { FOODS, CATEGORIES } from '../src/data/foods.js'
import { makeT } from '../src/i18n.js'
import { ACTIVITIES, GOALS, MEALS, bmr, computeTargets, dateKey, dayTotals, entryMacros, shiftDays } from '../src/lib/nutrition.js'

test('food catalogue has unique ids, valid values, servings and translations', () => {
  assert.ok(FOODS.length >= 70)
  assert.equal(new Set(FOODS.map(food => food.id)).size, FOODS.length)
  for (const food of FOODS) {
    assert.ok(CATEGORIES.includes(food.category))
    assert.ok(food.serving.grams > 0)
    for (const value of Object.values(food.per100)) assert.ok(Number.isFinite(value) && value >= 0)
    for (const lang of ['fr', 'ar', 'en']) {
      assert.ok(food.names[lang])
      assert.notEqual(makeT(lang)(`unit.${food.serving.unit}`), `unit.${food.serving.unit}`)
    }
  }
})

test('entry and daily totals scale per 100 grams and ignore missing foods', () => {
  const byId = { x: { per100: { kcal: 200, protein: 10, carbs: 20, fat: 5 } } }
  const entry = { foodId: 'x', grams: 150 }
  assert.deepEqual(entryMacros(entry, byId), { kcal: 300, protein: 15, carbs: 30, fat: 7.5 })
  assert.deepEqual(dayTotals({ breakfast: [entry], lunch: [{ foodId: 'missing', grams: 100 }] }, byId), entryMacros(entry, byId))
})

test('targets use activity and goal; dates use local calendar days', () => {
  const p = { sex: 'female', age: 28, height: 168, weight: 68, activity: 'moderate', goal: 'maintain' }
  assert.equal(bmr(p), 1429)
  assert.ok(computeTargets({ ...p, goal: 'lose' }).kcal < computeTargets(p).kcal)
  assert.ok(computeTargets({ ...p, goal: 'gain' }).kcal > computeTargets(p).kcal)
  assert.equal(dateKey(shiftDays(new Date(2024, 0, 1), -1)), '2023-12-31')
})

test('dynamic labels are translated in all supported languages', () => {
  const keys = [...CATEGORIES.map(x => `cat.${x}`), ...ACTIVITIES.flatMap(x => [`activity.${x.id}`, `activity.${x.id}Hint`]), ...GOALS.map(x => `goal.${x}`), ...MEALS.map(x => `meal.${x}`)]
  for (const lang of ['fr', 'ar', 'en']) for (const key of keys) assert.notEqual(makeT(lang)(key), key)
})
