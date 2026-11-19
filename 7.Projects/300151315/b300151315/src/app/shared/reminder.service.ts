import { Injectable } from '@angular/core'
import { LocalNotifications } from '@nativescript/local-notifications'

import { Course, Task } from './planner.service'

/** Rappels de tâches avec le plugin @nativescript/local-notifications. */
@Injectable({ providedIn: 'root' })
export class ReminderService {
  /** Rappel à 8 h le jour de la remise. */
  async schedule(task: Task, course?: Course): Promise<boolean> {
    const [y, m, d] = task.due.split('-').map(Number)
    const at = new Date(y, m - 1, d, 8, 0, 0)
    if (at.getTime() <= Date.now()) return false
    if (!(await LocalNotifications.requestPermission())) return false
    await LocalNotifications.schedule([
      {
        id: task.id,
        title: course ? `${course.code} · À remettre aujourd'hui` : "À remettre aujourd'hui",
        body: task.title,
        at,
      },
    ])
    return true
  }

  cancel(task: Task): void {
    LocalNotifications.cancel(task.id)
  }

  /** Notification de test dans 5 secondes. */
  async test(): Promise<boolean> {
    if (!(await LocalNotifications.requestPermission())) return false
    await LocalNotifications.schedule([
      {
        id: 99999,
        title: 'PlanBoréal',
        body: 'Les rappels fonctionnent ! 🎓',
        at: new Date(Date.now() + 5000),
      },
    ])
    return true
  }
}
