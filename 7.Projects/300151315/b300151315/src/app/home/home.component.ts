import { Component, computed, inject } from '@angular/core'

import { DAYS, MONTHS, PlannerService, daysLeft, dueLabel } from '../shared/planner.service'

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly p = inject(PlannerService)
  readonly dueLabel = dueLabel
  readonly daysLeft = daysLeft

  readonly todayLabel = (() => {
    const d = new Date()
    return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`
  })()

  readonly firstName = computed(() => this.p.profile().name.split(' ').pop())

  readonly percent = computed(() => {
    const total = this.p.tasks().length
    return total ? Math.round((this.p.doneCount() / total) * 100) : 0
  })

  /** Le prochain cours de la semaine (aujourd'hui s'il n'est pas fini, sinon les jours suivants). */
  readonly nextCourse = computed(() => {
    const now = new Date()
    const hm = `${now.getHours()}`.padStart(2, '0') + ':' + `${now.getMinutes()}`.padStart(2, '0')
    const list = [...this.p.courses()].sort((a, b) => a.day - b.day || a.start.localeCompare(b.start))
    for (let offset = 0; offset < 7; offset++) {
      const day = (now.getDay() + offset) % 7
      const found = list.find((c) => c.day === day && (offset > 0 || c.end > hm))
      if (found) return { course: found, when: offset === 0 ? "Aujourd'hui" : offset === 1 ? 'Demain' : DAYS[day] }
    }
    return null
  })

  readonly upcoming = computed(() =>
    this.p
      .tasks()
      .filter((t) => !t.done)
      .sort((a, b) => a.due.localeCompare(b.due))
      .slice(0, 4),
  )

  toggle(id: number): void {
    this.p.toggleTask(id)
  }
}
