import { Injectable, NgZone, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc, getDocs, writeBatch } from '@angular/fire/firestore';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Course, StudyTask } from '../models/study.models';

// Données initiales : insérées dans Firestore au premier lancement,
// quand les collections « courses » et « tasks » sont encore vides.
const seedCourses: Course[] = [
  { id: 'c1', name: 'Développement Web', code: 'INF1083', color: '#6957e8', instructor: 'Mme. Gagnon' },
  { id: 'c2', name: 'Bases de données', code: 'INF1030', color: '#e58c55', instructor: 'M. Roy' },
  { id: 'c3', name: 'Réseaux informatiques', code: 'INF1050', color: '#2f9d87', instructor: 'Mme. Chen' },
];
const today = new Date();
const date = (add: number) => { const d = new Date(today); d.setDate(d.getDate() + add); return d.toISOString().slice(0, 10); };
const seedTasks: StudyTask[] = [
  { id: 't1', title: 'Terminer le TP — composants Angular', courseId: 'c1', dueDate: date(1), priority: 'Haute', type: 'Devoir', done: false },
  { id: 't2', title: 'Réviser les observables et RxJS', courseId: 'c1', dueDate: date(2), priority: 'Moyenne', type: 'Révision', done: false },
  { id: 't3', title: 'Lire le chapitre 6 : SQL avancé', courseId: 'c2', dueDate: date(3), priority: 'Basse', type: 'Lecture', done: false },
  { id: 't4', title: 'Préparer le quiz sur les protocoles', courseId: 'c3', dueDate: date(4), priority: 'Haute', type: 'Révision', done: true },
  { id: 't5', title: 'Maquette de l’application finale', courseId: 'c1', dueDate: date(6), priority: 'Moyenne', type: 'Projet', done: false },
];

// Retire le champ « id » des données écrites : dans Firestore, l'id est
// l'identifiant du document, et collectionData le rajoute via idField.
function withoutId<T extends { id: string }>(item: T): Omit<T, 'id'> {
  const { id, ...rest } = item;
  return rest;
}

@Injectable({ providedIn: 'root' })
export class StudyService {
  // Injection par inject() (plutôt que par le constructeur) : le type
  // Firestore d'AngularFire n'est pas reconnu comme jeton d'injection
  // par le compilateur Angular en mode développement (ng serve).
  private firestore = inject(Firestore);
  private ngZone = inject(NgZone);
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private tasksSubject = new BehaviorSubject<StudyTask[]>([]);
  courses$ = this.coursesSubject.asObservable();
  tasks$ = this.tasksSubject.asObservable();
  summary$ = this.tasks$.pipe(map(tasks => ({ total: tasks.length, done: tasks.filter(t => t.done).length, open: tasks.filter(t => !t.done).length, urgent: tasks.filter(t => !t.done && this.daysUntil(t.dueDate) <= 2).length })));
  get coursesSnapshot() { return this.coursesSubject.value; }
  get tasksSnapshot() { return this.tasksSubject.value; }

  constructor() {
    // L'écran n'est JAMAIS vide : on affiche les données par défaut tout de
    // suite, puis Firestore prend le relais quand ses données arrivent.
    // Si Firestore est indisponible, l'application continue avec les données
    // locales au lieu de rester vide.
    this.coursesSubject.next([...seedCourses]);
    this.tasksSubject.next([...seedTasks]);
    // 1. D'abord, compléter les données initiales manquantes (lecture unique,
    //    puis écriture en un seul lot atomique) — voir seedIfEmpty().
    // 2. Ensuite seulement, s'abonner aux flux en direct : chaque changement
    //    dans la base met à jour l'application automatiquement.
    // Les mises à jour Firestore arrivent hors de la zone Angular : on les
    // remet dans la zone (ngZone.run) pour que l'affichage se rafraîchisse.
    // Même si le seed échoue, l'abonnement démarre quand même (.finally).
    const courses$ = collectionData(collection(this.firestore, 'courses'), { idField: 'id' }) as Observable<Course[]>;
    const tasks$ = collectionData(collection(this.firestore, 'tasks'), { idField: 'id' }) as Observable<StudyTask[]>;
    this.seedIfEmpty()
      .catch(() => { /* Firestore indisponible : on garde les données locales. */ })
      .finally(() => {
        combineLatest([courses$, tasks$]).subscribe(([courses, tasks]) => {
          this.ngZone.run(() => {
            this.coursesSubject.next(courses);
            this.tasksSubject.next(tasks);
          });
        });
      });
  }

  // Premier lancement (ou base incomplète) : écrit les cours et tâches par
  // défaut MANQUANTS, en un seul lot atomique. N'écrase jamais les données
  // existantes (cours créés par l'utilisateur, tâches ajoutées, ...).
  private async seedIfEmpty() {
    const coursesSnap = await getDocs(collection(this.firestore, 'courses'));
    const tasksSnap = await getDocs(collection(this.firestore, 'tasks'));
    const existingCourseIds = new Set(coursesSnap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => d.id));
    const existingTaskIds = new Set(tasksSnap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => d.id));
    const batch = writeBatch(this.firestore);
    let hasWrites = false;
    for (const c of seedCourses) {
      if (!existingCourseIds.has(c.id)) { batch.set(doc(this.firestore, 'courses', c.id), withoutId(c)); hasWrites = true; }
    }
    for (const t of seedTasks) {
      if (!existingTaskIds.has(t.id)) { batch.set(doc(this.firestore, 'tasks', t.id), withoutId(t)); hasWrites = true; }
    }
    if (hasWrites) await batch.commit();
  }

  async addCourse(course: Omit<Course, 'id'>) {
    const id = crypto.randomUUID();
    const newCourse = { ...course, id };
    this.coursesSubject.next([...this.coursesSnapshot, newCourse]);
    await setDoc(doc(this.firestore, 'courses', id), withoutId(newCourse));
  }
  async addTask(task: Omit<StudyTask, 'id' | 'done'>) {
    const id = crypto.randomUUID();
    const newTask = { ...task, id, done: false };
    this.tasksSubject.next([...this.tasksSnapshot, newTask]);
    await setDoc(doc(this.firestore, 'tasks', id), withoutId(newTask));
  }
  async toggleTask(id: string) {
    const task = this.tasksSnapshot.find(t => t.id === id);
    if (!task) return;
    const updated = { ...task, done: !task.done };
    this.tasksSubject.next(this.tasksSnapshot.map(t => t.id === id ? updated : t));
    await updateDoc(doc(this.firestore, 'tasks', id), { done: updated.done });
  }
  async deleteTask(id: string) {
    this.tasksSubject.next(this.tasksSnapshot.filter(t => t.id !== id));
    await deleteDoc(doc(this.firestore, 'tasks', id));
  }
  async deleteCourse(id: string) {
    const tasksToDelete = this.tasksSnapshot.filter(t => t.courseId === id);
    this.coursesSubject.next(this.coursesSnapshot.filter(c => c.id !== id));
    this.tasksSubject.next(this.tasksSnapshot.filter(t => t.courseId !== id));
    await deleteDoc(doc(this.firestore, 'courses', id));
    for (const t of tasksToDelete) { await deleteDoc(doc(this.firestore, 'tasks', t.id)); }
  }
  course(id: string) { return this.coursesSnapshot.find(c => c.id === id); }
  daysUntil(date: string) { const a = new Date(); a.setHours(0, 0, 0, 0); return Math.ceil((new Date(date + 'T00:00:00').getTime() - a.getTime()) / 86400000); }
}
