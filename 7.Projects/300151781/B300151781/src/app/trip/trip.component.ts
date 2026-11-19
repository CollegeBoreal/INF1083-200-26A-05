import { Component } from '@angular/core'
import { DatePicker, TextField } from '@nativescript/core'
import { TripItem } from '../core/models/city'
import { TripService } from '../core/services/trip.service'
import { BudgetService, Expense } from '../core/services/budget.service'

@Component({
  standalone: false,
  selector: 'ns-trip',
  templateUrl: './trip.component.html',
})
export class TripComponent {
  readonly items$ = this.tripService.items$
  newItem = ''
  editingDate = false
  readonly minDate = new Date()
  readonly budget$ = this.budgetService.budget$
  expenseLabel = ''
  expenseAmount = 0

  constructor(
    public tripService: TripService,
    public budgetService: BudgetService,
  ) {}

  money(value: number): string {
    return value.toLocaleString('fr-CA', { maximumFractionDigits: 0 }) + ' $'
  }

  // Les types DOM d'Angular ne connaissent pas TextField : on convertit les arguments
  setTotal(target: any): void {
    const field = target as TextField
    this.budgetService.setTotal(parseFloat((field.text || '').replace(',', '.')))
    field.dismissSoftInput()
  }

  onExpenseLabel(args: any): void {
    this.expenseLabel = (args.object as TextField).text
  }

  onExpenseAmount(args: any): void {
    this.expenseAmount = parseFloat(((args.object as TextField).text || '').replace(',', '.'))
  }

  addExpense(labelField: any, amountField: any): void {
    this.budgetService.add(this.expenseLabel, this.expenseAmount)
    ;(labelField as TextField).text = ''
    ;(amountField as TextField).text = ''
    ;(amountField as TextField).dismissSoftInput()
    this.expenseLabel = ''
    this.expenseAmount = 0
  }

  removeExpense(expense: Expense): void {
    this.budgetService.remove(expense.id)
  }

  doneCount(items: TripItem[]): number {
    return items.filter((item) => item.done).length
  }

  byCategory(items: TripItem[], category: TripItem['category']): TripItem[] {
    return items.filter((item) => item.category === category)
  }

  onInput(args: any): void {
    this.newItem = (args.object as TextField).text
  }

  addItem(target: any): void {
    const field = target as TextField
    this.tripService.add(this.newItem, 'valise')
    this.newItem = ''
    field.text = ''
    field.dismissSoftInput()
  }

  get countdown(): string {
    const days = this.tripService.daysLeft
    if (days === null) return 'Choisissez votre date de départ'
    if (days > 1) return `J-${days} avant le grand départ`
    if (days === 1) return 'Départ demain ! Dernières vérifications'
    if (days === 0) return `C'est aujourd'hui ! Bon voyage ✈️`
    return 'Voyage terminé, bon retour 🏠'
  }

  get departureLabel(): string {
    const d = this.tripService.departure
    return d ? d.toLocaleDateString('fr-CA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Aucune date'
  }

  // Le type DOM d'Angular ne connaît pas DatePicker : on convertit l'argument
  onDate(args: any): void {
    this.tripService.setDeparture((args.object as DatePicker).date)
  }

  toggle(item: TripItem): void {
    this.tripService.toggle(item.id)
  }

  remove(item: TripItem): void {
    this.tripService.remove(item.id)
  }
}
