import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course, StudyTask } from '../models/study.models';
const COURSES_KEY='studybuddy.courses.v1', TASKS_KEY='studybuddy.tasks.v1';
const seedCourses: Course[]=[{id:'c1',name:'Développement Web',code:'INF1083',color:'#6957e8',instructor:'Mme. Gagnon'},{id:'c2',name:'Bases de données',code:'INF1030',color:'#e58c55',instructor:'M. Roy'},{id:'c3',name:'Réseaux informatiques',code:'INF1050',color:'#2f9d87',instructor:'Mme. Chen'}];
const today=new Date(); const date=(add:number)=>{const d=new Date(today);d.setDate(d.getDate()+add);return d.toISOString().slice(0,10)};
const seedTasks: StudyTask[]=[{id:'t1',title:'Terminer le TP — composants Angular',courseId:'c1',dueDate:date(1),priority:'Haute',type:'Devoir',done:false},{id:'t2',title:'Réviser les observables et RxJS',courseId:'c1',dueDate:date(2),priority:'Moyenne',type:'Révision',done:false},{id:'t3',title:'Lire le chapitre 6 : SQL avancé',courseId:'c2',dueDate:date(3),priority:'Basse',type:'Lecture',done:false},{id:'t4',title:'Préparer le quiz sur les protocoles',courseId:'c3',dueDate:date(4),priority:'Haute',type:'Révision',done:true},{id:'t5',title:'Maquette de l’application finale',courseId:'c1',dueDate:date(6),priority:'Moyenne',type:'Projet',done:false}];
function load<T>(key:string, fallback:T):T { try { const raw=localStorage.getItem(key); return raw?JSON.parse(raw) as T:fallback; } catch { return fallback; } }
@Injectable({providedIn:'root'}) export class StudyService {
 private coursesSubject=new BehaviorSubject<Course[]>(load(COURSES_KEY,seedCourses));
 private tasksSubject=new BehaviorSubject<StudyTask[]>(load(TASKS_KEY,seedTasks));
 courses$=this.coursesSubject.asObservable(); tasks$=this.tasksSubject.asObservable();
 summary$=this.tasks$.pipe(map(tasks=>({total:tasks.length,done:tasks.filter(t=>t.done).length,open:tasks.filter(t=>!t.done).length,urgent:tasks.filter(t=>!t.done&&this.daysUntil(t.dueDate)<=2).length})));
 get coursesSnapshot(){return this.coursesSubject.value;} get tasksSnapshot(){return this.tasksSubject.value;}
 addCourse(course:Omit<Course,'id'>){this.coursesSubject.next([...this.coursesSnapshot,{...course,id:crypto.randomUUID()}]);this.persist();}
 addTask(task:Omit<StudyTask,'id'|'done'>){this.tasksSubject.next([...this.tasksSnapshot,{...task,id:crypto.randomUUID(),done:false}]);this.persist();}
 toggleTask(id:string){this.tasksSubject.next(this.tasksSnapshot.map(t=>t.id===id?{...t,done:!t.done}:t));this.persist();}
 deleteTask(id:string){this.tasksSubject.next(this.tasksSnapshot.filter(t=>t.id!==id));this.persist();}
 deleteCourse(id:string){this.coursesSubject.next(this.coursesSnapshot.filter(c=>c.id!==id));this.tasksSubject.next(this.tasksSnapshot.filter(t=>t.courseId!==id));this.persist();}
 course(id:string){return this.coursesSnapshot.find(c=>c.id===id);}
 daysUntil(date:string){const a=new Date();a.setHours(0,0,0,0);return Math.ceil((new Date(date+'T00:00:00').getTime()-a.getTime())/86400000);}
 private persist(){localStorage.setItem(COURSES_KEY,JSON.stringify(this.coursesSnapshot));localStorage.setItem(TASKS_KEY,JSON.stringify(this.tasksSnapshot));}
}
