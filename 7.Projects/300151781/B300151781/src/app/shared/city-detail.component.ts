import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { Dialogs, ImageSource, TextField, TextView } from '@nativescript/core'
import { shareText } from '@nativescript/social-share'
import { City } from '../core/models/city'
import { PHRASES, PhraseBook } from '../core/data/phrases'
import { rateFor, Rate } from '../core/data/rates'
import { BadgeService } from '../core/services/badge.service'
import { CityService } from '../core/services/city.service'
import { FavoritesService } from '../core/services/favorites.service'
import { NotesService } from '../core/services/notes.service'
import { TripService } from '../core/services/trip.service'
import { WikiInfo, WikiService } from '../core/services/wiki.service'
import { popIn, pulse, slideIn } from './animations'

@Component({
  standalone: false,
  selector: 'ns-city-detail',
  templateUrl: './city-detail.component.html',
})
export class CityDetailComponent implements OnInit, OnDestroy {
  city: City
  isFavorite = false
  inTrip = false
  localTime = ''
  rate: Rate | null = null
  phrases: PhraseBook | null = null
  amount = 100
  note = ''
  noteStatus = ''
  wiki: WikiInfo | null = null
  photo: ImageSource | null = null
  loadingWiki = true
  private timer: ReturnType<typeof setInterval>

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private zone: NgZone,
    private cityService: CityService,
    private favoritesService: FavoritesService,
    private tripService: TripService,
    private notesService: NotesService,
    private badgeService: BadgeService,
    private wikiService: WikiService,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id
    this.city = this.cityService.getById(id)
    this.rate = rateFor(this.city.currency)
    this.phrases = PHRASES[this.city.lang] || null
    this.isFavorite = this.favoritesService.isFavorite(id)
    this.inTrip = this.tripService.hasCity(this.city.name)
    const saved = this.notesService.get(id)
    this.note = saved ? saved.text : ''
    this.noteStatus = saved ? this.formatStatus(saved.updated) : 'Aucune note pour le moment'
    this.badgeService.visit(id)
    this.updateLocalTime()
    this.timer = setInterval(() => this.updateLocalTime(), 30000)
    this.loadWiki()
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

  goBack(): void {
    this.routerExtensions.back({ relativeTo: this.route })
  }

  // Photo et histoire chargées depuis Wikipédia (nécessite Internet)
  private async loadWiki(): Promise<void> {
    const info = await this.wikiService.get(this.city)
    this.zone.run(() => {
      this.wiki = info
      this.loadingWiki = false
    })
    if (info.image) {
      const photo = await this.wikiService.photo(info.image)
      this.zone.run(() => (this.photo = photo))
    }
  }

  onPhoto(args: any): void {
    popIn(args.object)
  }

  toggleFavorite(args: any): void {
    this.isFavorite = this.favoritesService.toggle(this.city.id)
    pulse(args.object)
  }

  onHero(args: any): void {
    slideIn(args.object)
  }

  // Le type DOM d'Angular ne connaît pas TextView : on convertit les arguments
  onNote(args: any): void {
    this.note = (args.object as TextView).text
    this.noteStatus = 'Modifications non enregistrées…'
  }

  saveNote(target: any): void {
    const saved = this.notesService.save(this.city.id, this.note)
    ;(target as TextView).dismissSoftInput()
    this.noteStatus = saved.text ? this.formatStatus(saved.updated) : 'Note supprimée'
  }

  private formatStatus(iso: string): string {
    const d = new Date(iso)
    const pad = (n: number) => (n < 10 ? '0' : '') + n
    return `✓ Enregistrée le ${d.toLocaleDateString('fr-CA')} à ${pad(d.getHours())}:${pad(d.getMinutes())}`
  }

  addToTrip(): void {
    this.tripService.addCity(this.city.name)
    this.inTrip = true
    Dialogs.alert({ title: 'Mon voyage', message: `${this.city.name} a été ajoutée à votre voyage.`, okButtonText: 'Parfait' })
  }

  get converted(): string {
    const value = this.amount * this.rate.perCad
    return value.toLocaleString('fr-CA', { maximumFractionDigits: value < 100 ? 2 : 0 })
  }

  // Le type DOM d'Angular ne connaît pas TextField : on convertit l'argument
  onAmount(args: any): void {
    const value = parseFloat(((args.object as TextField).text || '').replace(',', '.'))
    this.amount = isNaN(value) ? 0 : value
  }

  setAmount(value: number, target: any): void {
    this.amount = value
    ;(target as TextField).text = String(value)
  }

  share(): void {
    const c = this.city
    shareText(
      `${c.flag} ${c.name} (${c.country}) — ${c.tagline}\n\nÀ voir : ${c.highlights.join(', ')}\nMeilleure saison : ${c.bestSeason}\n\nDécouvert avec Lounivers`,
      `Lounivers — ${c.name}`,
    )
  }

  // Heure actuelle dans la ville, calculée à partir de son décalage UTC
  private updateLocalTime(): void {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const local = new Date(utc + this.city.tzOffset * 3600000)
    const pad = (n: number) => (n < 10 ? '0' : '') + n
    this.localTime = `${pad(local.getHours())}:${pad(local.getMinutes())}`
  }
}
