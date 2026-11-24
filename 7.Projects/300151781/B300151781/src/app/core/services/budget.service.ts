import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'
import { BehaviorSubject } from 'rxjs'

const BUDGET_KEY = 'lounivers.budget'

export interface Expense {
  id: number
  label: string
  amount: number
}

export interface Budget {
  total: number
  expenses: Expense[]
}

@Injectable({ providedIn: 'root' })
export class BudgetService {
  readonly budget$ = new BehaviorSubject<Budget>(this.load())

  spent(budget: Budget): number {
    return budget.expenses.reduce((sum, e) => sum + e.amount, 0)
  }

  remaining(budget: Budget): number {
    return budget.total - this.spent(budget)
  }

  percent(budget: Budget): number {
    return budget.total ? Math.min(100, Math.round((this.spent(budget) / budget.total) * 100)) : 0
  }

  setTotal(total: number): void {
    if (isNaN(total) || total < 0) return
    this.save({ ...this.budget$.value, total })
  }

  add(label: string, amount: number): void {
    const text = (label || '').trim()
    if (!text || isNaN(amount) || amount <= 0) return
    const b = this.budget$.value
    const id = Math.max(0, ...b.expenses.map((e) => e.id)) + 1
    this.save({ ...b, expenses: [...b.expenses, { id, label: text, amount }] })
  }

  remove(id: number): void {
    const b = this.budget$.value
    this.save({ ...b, expenses: b.expenses.filter((e) => e.id !== id) })
  }

  private load(): Budget {
    try {
      const saved = ApplicationSettings.getString(BUDGET_KEY)
      return saved ? JSON.parse(saved) : { total: 2000, expenses: [] }
    } catch {
      return { total: 2000, expenses: [] }
    }
  }

  private save(budget: Budget): void {
    ApplicationSettings.setString(BUDGET_KEY, JSON.stringify(budget))
    this.budget$.next(budget)
  }
}
