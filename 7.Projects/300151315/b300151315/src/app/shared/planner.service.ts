import { Injectable, computed, signal } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'

export interface Course {
  id: number
  code: string
  name: string
  room: string
  day: number // 1 = lundi ... 5 = vendredi
  start: string // "09:00"
  end: string
  color: string
}

export interface Task {
  id: number
  title: string
  courseId: number
  due: string // "2026-11-18"
  done: boolean
}

export interface Profile {
  name: string
  studentId: string
  program: string
  reminders: boolean
}

export const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
export const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
export const COLORS = ['#5b3df5', '#ff6b4a', '#12b886', '#f59f00', '#1c7ed6', '#e64980']

export function dayKey(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const j = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${m}-${j}`
}

export function addDays(n: number): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + n)
  return d
}

/** Nombre de jours entre aujourd'hui et la date de remise. */
export function daysLeft(due: string): number {
  const [y, m, d] = due.split('-').map(Number)
  const target = new Date(y, m - 1, d)
  return Math.round((target.getTime() - addDays(0).getTime()) / 86400000)
}

export function dueLabel(due: string): string {
  const n = daysLeft(due)
  if (n < 0) return n === -1 ? 'En retard (hier)' : `En retard (${-n} j)`
  if (n === 0) return "Aujourd'hui"
  if (n === 1) return 'Demain'
  return `Dans ${n} jours`
}

const SEED_COURSES: Course[] = [
  { id: 1, code: 'INF1083', name: 'Développement mobile', room: 'B-2104', day: 1, start: '09:00', end: '12:00', color: COLORS[0] },
  { id: 2, code: 'INF1085', name: 'Systèmes et virtualisation', room: 'B-2110', day: 2, start: '13:00', end: '16:00', color: COLORS[1] },
  { id: 3, code: 'WIN', name: 'Administration Windows Server', room: 'B-2112', day: 3, start: '09:00', end: '12:00', color: COLORS[2] },
  { id: 4, code: 'BD', name: 'Bases de données NoSQL', room: 'B-2006', day: 4, start: '13:00', end: '15:00', color: COLORS[3] },
]

function seedTasks(): Task[] {
  return [
    { id: 1, title: 'Laboratoire Animations', courseId: 1, due: dayKey(addDays(-1)), done: true },
    { id: 2, title: 'Projet mobile : documentation', courseId: 1, due: dayKey(addDays(3)), done: false },
    { id: 3, title: 'GPO et partages TechVentures', courseId: 3, due: dayKey(addDays(1)), done: false },
    { id: 4, title: 'Requêtes MongoDB insertMany', courseId: 4, due: dayKey(addDays(0)), done: false },
    { id: 5, title: 'Stockage NVMe Proxmox', courseId: 2, due: dayKey(addDays(-2)), done: false },
  ]
}

const SEED_PROFILE: Profile = { name: 'Toumi Ayoub', studentId: '300151315', program: 'Informatique', reminders: true }

function load<T>(key: string, fallback: T): T {
  const raw = ApplicationSettings.getString(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/** Données de l'application, gardées sur le téléphone avec ApplicationSettings. */
@Injectable({ providedIn: 'root' })
export class PlannerService {
  readonly courses = signal<Course[]>(load('courses', SEED_COURSES))
  readonly tasks = signal<Task[]>(load('tasks', seedTasks()))
  readonly profile = signal<Profile>(load('profile', SEED_PROFILE))

  readonly doneCount = computed(() => this.tasks().filter((t) => t.done).length)
  readonly lateCount = computed(() => this.tasks().filter((t) => !t.done && daysLeft(t.due) < 0).length)

  course(id: number): Course | undefined {
    return this.courses().find((c) => c.id === id)
  }

  addCourse(c: Omit<Course, 'id' | 'color'>): void {
    const list = this.courses()
    const id = Math.max(0, ...list.map((x) => x.id)) + 1
    this.courses.set([...list, { ...c, id, color: COLORS[(id - 1) % COLORS.length] }])
    this.save()
  }

  removeCourse(id: number): void {
    this.courses.set(this.courses().filter((c) => c.id !== id))
    this.tasks.set(this.tasks().filter((t) => t.courseId !== id))
    this.save()
  }

  addTask(title: string, courseId: number, due: Date): Task {
    const list = this.tasks()
    const task: Task = { id: Math.max(0, ...list.map((x) => x.id)) + 1, title, courseId, due: dayKey(due), done: false }
    this.tasks.set([...list, task])
    this.save()
    return task
  }

  toggleTask(id: number): Task | undefined {
    this.tasks.set(this.tasks().map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
    this.save()
    return this.tasks().find((t) => t.id === id)
  }

  removeTask(id: number): void {
    this.tasks.set(this.tasks().filter((t) => t.id !== id))
    this.save()
  }

  updateProfile(p: Profile): void {
    this.profile.set({ ...p })
    this.save()
  }

  reset(): void {
    this.courses.set(SEED_COURSES)
    this.tasks.set(seedTasks())
    this.profile.set(SEED_PROFILE)
    this.save()
  }

  private save(): void {
    ApplicationSettings.setString('courses', JSON.stringify(this.courses()))
    ApplicationSettings.setString('tasks', JSON.stringify(this.tasks()))
    ApplicationSettings.setString('profile', JSON.stringify(this.profile()))
  }
}
