import { Component, OnInit } from '@angular/core';
import { StudyService } from '../services/study.service';
import { WeatherService, Weather } from '../services/weather.service';
import { QuoteService, Quote } from '../services/quote.service';
import { HolidayService, Holiday } from '../services/holiday.service';
import { StudyTask } from '../models/study.models';

@Component({
  selector: 'app-dashboard',
  template: `
<section class="welcome"><div><div class="eyebrow">LUNDI, NOUVELLE SEMAINE ✨</div><h1>Bonjour, prêt·e à<br>faire de belles choses ?</h1><p *ngIf="quote">« {{quote.text}} » — {{quote.author}}</p><p *ngIf="!quote">Un petit pas aujourd'hui, un grand progrès demain.</p><a class="button primary" routerLink="/taches">Voir mes tâches <span>→</span></a></div><div class="welcome-art"><div class="art-circle"><span>✦</span></div><div class="art-card">☕ &nbsp; Focus du jour</div><div class="art-book">📚</div></div></section>
<div class="stats">
  <article class="stat-card"><div class="stat-top"><span>Tâches à faire</span><i class="stat-icon purple">☷</i></div><strong>{{(service.summary$|async)?.open}}</strong><small>À ton rythme, une à la fois</small></article>
  <article class="stat-card"><div class="stat-top"><span>Terminées</span><i class="stat-icon green">✓</i></div><strong>{{(service.summary$|async)?.done}}</strong><small>Bravo pour tes efforts !</small></article>
  <article class="stat-card"><div class="stat-top"><span>À venir bientôt</span><i class="stat-icon orange">◷</i></div><strong>{{(service.summary$|async)?.urgent}}</strong><small>Dans les deux prochains jours</small></article>
  <article class="stat-card progress-card"><div class="stat-top"><span>Progression totale</span><i class="stat-icon blue">↗</i></div><strong>{{percent}}<em>%</em></strong><div class="progress"><span [style.width.%]="percent"></span></div></article>
  <article class="stat-card"><div class="stat-top"><span>Météo — Toronto</span><i class="stat-icon blue">{{weather?.icon || '🌡️'}}</i></div><strong *ngIf="weather">{{weather.temperature}}<em>°C</em></strong><strong *ngIf="weather === null">—</strong><strong *ngIf="weather === undefined">…</strong><small *ngIf="weather">{{weather.label}} · Vent {{weather.windSpeed}} km/h · Humidité {{weather.humidity}}%</small><small *ngIf="weather === null">Météo indisponible (hors ligne)</small><small *ngIf="weather === undefined">Chargement de la météo…</small></article>
</div>
<section class="content-grid"><div class="panel"><div class="panel-heading"><div><h2>À ne pas oublier</h2><p>Les prochaines étapes de ton parcours</p></div><a routerLink="/taches">Tout voir →</a></div><div class="task-list"><div class="task-row" *ngFor="let t of upcoming"><button class="check" [class.checked]="t.done" (click)="service.toggleTask(t.id)">{{t.done?'✓':''}}</button><div class="task-info"><b [class.strike]="t.done">{{t.title}}</b><small><i [style.background]="service.course(t.courseId)?.color"></i>{{service.course(t.courseId)?.code}} · {{t.type}}</small></div><span class="priority" [class]="'priority '+t.priority.toLowerCase()">{{t.priority}}</span><span class="due">{{due(t)}}</span></div><div class="empty" *ngIf="!upcoming.length">Aucune tâche pour le moment. Profite de ta pause ! ☀</div></div></div><div class="panel courses-panel"><div class="panel-heading"><div><h2>Mes cours</h2><p>Ton semestre en un coup d'œil</p></div><a routerLink="/cours">Gérer →</a></div><a class="course-row" *ngFor="let c of courses|async" routerLink="/cours"><span class="course-dot" [style.background]="c.color"></span><span><b>{{c.name}}</b><small>{{c.code}}</small></span><span class="course-arrow">↗</span></a><a class="add-course-link" routerLink="/cours">＋ Ajouter un cours</a></div><div class="panel"><div class="panel-heading"><div><h2>Jours fériés — Canada</h2><p>Pour planifier tes révisions</p></div></div><div class="task-list"><div class="task-row" *ngFor="let h of holidays"><div class="task-info"><b>{{h.name}}</b><small>🇨🇦 Jour férié national</small></div><span class="due">{{formatDate(h.date)}}</span></div><div class="empty" *ngIf="!holidays.length">Chargement des jours fériés…</div></div></div></section>
`
})
export class DashboardComponent implements OnInit {
  constructor(
    public service: StudyService,
    private weatherService: WeatherService,
    private quoteService: QuoteService,
    private holidayService: HolidayService
  ) {}
  courses = this.service.courses$;
  // Météo : undefined = chargement, null = indisponible (hors ligne / erreur API).
  weather: Weather | null | undefined;
  // Citation : null = API indisponible, on garde le message par défaut.
  quote: Quote | null = null;
  // Jours fériés à venir (liste vide = chargement ou erreur).
  holidays: Holiday[] = [];
  ngOnInit() {
    this.weatherService.getWeather().subscribe(w => this.weather = w);
    this.quoteService.getQuote().subscribe(q => this.quote = q);
    this.holidayService.getUpcomingHolidays(3).subscribe(h => this.holidays = h);
  }
  get upcoming() { return [...this.service.tasksSnapshot].sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 4) }
  get percent() { const s = this.service.tasksSnapshot; return s.length ? Math.round(s.filter(t => t.done).length / s.length * 100) : 0 }
  due(t: StudyTask) { const d = this.service.daysUntil(t.dueDate); return d < 0 ? 'En retard' : d === 0 ? "Aujourd’hui" : d === 1 ? 'Demain' : `Dans ${d} jours` }
  // "2026-12-25" -> "25 déc. 2026"
  formatDate(iso: string) {
    const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    const [y, m, d] = iso.split('-').map(Number);
    return `${d} ${months[m - 1]} ${y}`;
  }
}
