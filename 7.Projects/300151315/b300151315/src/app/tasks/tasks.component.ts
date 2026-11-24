import { Component, computed, inject, signal } from '@angular/core'

import { PlannerService, Task, addDays, daysLeft, dueLabel } from '../shared/planner.service'
import { ReminderService } from '../shared/reminder.service'

type Filter = 'todo' | 'done' | 'all'

@Component({
  standalone: false,
  selector: 'Tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
  readonly p = inject(PlannerService)
  private readonly reminders = inject(ReminderService)
  readonly dueLabel = dueLabel
  readonly daysLeft = daysLeft

  readonly filters: { key: Filter; label: string }[] = [
    { key: 'todo', label: 'À faire' },
    { key: 'done', label: 'Faites' },
    { key: 'all', label: 'Toutes' },
  ]
  readonly dueChoices = [
    { days: 0, label: "Aujourd'hui" },
    { days: 1, label: 'Demain' },
    { days: 3, label: '+3 jours' },
    { days: 7, label: '+1 sem.' },
  ]

  readonly filter = signal<Filter>('todo')
  showForm = false
  title = ''
  courseId = 0
  dueDays = 1
  message = ''

  readonly list = computed(() => {
    const f = this.filter()
    return this.p
      .tasks()
      .filter((t) => (f === 'all' ? true : f === 'done' ? t.done : !t.done))
      .sort((a, b) => Number(a.done) - Number(b.done) || a.due.localeCompare(b.due))
  })

  openForm(): void {
    this.showForm = !this.showForm
    if (!this.courseId && this.p.courses().length) this.courseId = this.p.courses()[0].id
    this.message = ''
  }

  async add(): Promise<void> {
    if (!this.title.trim()) {
      this.message = 'Donnez un titre à la tâche.'
      return
    }
    const task = this.p.addTask(this.title.trim(), this.courseId, addDays(this.dueDays))
    this.title = ''
    this.showForm = false
    this.filter.set('todo')
    this.message = ''
    if (this.p.profile().reminders) {
      const ok = await this.reminders.schedule(task, this.p.course(task.courseId))
      this.message = ok ? '🔔 Rappel prévu à 8 h le jour de la remise.' : ''
    }
  }

  toggle(t: Task): void {
    const updated = this.p.toggleTask(t.id)
    if (updated?.done) this.reminders.cancel(updated)
  }

  remove(t: Task): void {
    this.reminders.cancel(t)
    this.p.removeTask(t.id)
  }
}
