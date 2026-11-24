
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { ApplicationSettings } from '@nativescript/core'

interface Expense {
  id: number
  title: string
  category: string
  amount: number
  date: string
}

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  expenses: Expense[] = []

  title = ''
  category = 'Fuel'
  amount = ''

  categories = ['Fuel', 'Maintenance', 'Insurance', 'Repairs', 'Other']

  totalExpenses = 0

  constructor() {}

  ngOnInit(): void {
    this.loadExpenses()
  }

  loadExpenses(): void {
    const saved = ApplicationSettings.getString('carcare_expenses', '[]')

    try {
      this.expenses = JSON.parse(saved) as Expense[]
    } catch {
      this.expenses = []
    }

    this.calculateTotal()
  }

  addExpense(): void {
    const expenseAmount = Number(this.amount)

    if (!this.title.trim() || !this.amount.trim() ||
        !Number.isFinite(expenseAmount) || expenseAmount <= 0) {
      alert('Please enter a valid description and amount.')
      return
    }

    const expense: Expense = {
      id: Date.now(),
      title: this.title.trim(),
      category: this.category,
      amount: expenseAmount,
      date: new Date().toLocaleDateString()
    }

    this.expenses.unshift(expense)

    this.saveExpenses()

    this.title = ''
    this.amount = ''
  }

  deleteExpense(id: number): void {
    this.expenses = this.expenses.filter(item => item.id !== id)
    this.saveExpenses()
  }

  saveExpenses(): void {
    ApplicationSettings.setString(
      'carcare_expenses',
      JSON.stringify(this.expenses)
    )

    this.calculateTotal()
  }

  calculateTotal(): void {
    this.totalExpenses = this.expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    )
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
