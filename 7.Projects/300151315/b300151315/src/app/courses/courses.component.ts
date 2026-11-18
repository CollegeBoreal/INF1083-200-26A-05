import { Component, computed, inject } from '@angular/core'
import { Dialogs } from '@nativescript/core'

import { Course, DAYS, PlannerService } from '../shared/planner.service'

@Component({
  standalone: false,
  selector: 'Courses',
  templateUrl: './courses.component.html',
})
export class CoursesComponent {
  readonly p = inject(PlannerService)
  readonly weekDays = [1, 2, 3, 4, 5].map((d) => ({ day: d, short: DAYS[d].slice(0, 3), name: DAYS[d] }))

  showForm = false
  code = ''
  name = ''
  room = ''
  day = 1
  start = '09:00'
  end = '12:00'
  error = ''

  /** Les cours groupés par jour de la semaine. */
  readonly byDay = computed(() =>
    this.weekDays
      .map((w) => ({
        ...w,
        courses: this.p
          .courses()
          .filter((c) => c.day === w.day)
          .sort((a, b) => a.start.localeCompare(b.start)),
      }))
      .filter((g) => g.courses.length > 0),
  )

  taskCount(c: Course): number {
    return this.p.tasks().filter((t) => t.courseId === c.id && !t.done).length
  }

  add(): void {
    const time = /^([01]\d|2[0-3]):[0-5]\d$/
    if (!this.code.trim() || !this.name.trim()) {
      this.error = 'Le code et le nom du cours sont obligatoires.'
      return
    }
    if (!time.test(this.start) || !time.test(this.end) || this.end <= this.start) {
      this.error = 'Heures au format HH:MM, la fin après le début.'
      return
    }
    this.p.addCourse({
      code: this.code.trim().toUpperCase(),
      name: this.name.trim(),
      room: this.room.trim() || '—',
      day: this.day,
      start: this.start,
      end: this.end,
    })
    this.code = this.name = this.room = this.error = ''
    this.showForm = false
  }

  async remove(c: Course): Promise<void> {
    const ok = await Dialogs.confirm({
      title: 'Supprimer le cours ?',
      message: `${c.code} et ses tâches seront supprimés.`,
      okButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
    })
    if (ok) this.p.removeCourse(c.id)
  }
}
