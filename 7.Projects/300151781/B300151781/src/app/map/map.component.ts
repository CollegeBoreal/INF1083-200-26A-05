import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { Screen, ScrollView } from '@nativescript/core'
import { COORDS, distanceKm, HOME, MAP_RATIO, project } from '../core/data/coords'
import { City } from '../core/models/city'
import { BadgeService } from '../core/services/badge.service'
import { CityService } from '../core/services/city.service'
import { popIn, pulse } from '../shared/animations'

interface Pin {
  city: City
  x: number
  y: number
}

const PIN = 16
const ZOOMS = [1, 1.6, 2.4]

@Component({
  standalone: false,
  selector: 'ns-map',
  templateUrl: './map.component.html',
})
export class MapComponent {
  readonly regions = this.cityService.regions
  readonly pinSize = PIN
  region = 'Toutes'
  zoomIndex = 1
  width = 0
  height = 0
  pins: Pin[] = []
  selected: City | null = null
  private scroller: ScrollView

  constructor(
    private cityService: CityService,
    public badgeService: BadgeService,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
  ) {
    this.layout()
  }

  get zoomLabel(): string {
    return '×' + ZOOMS[this.zoomIndex]
  }

  get distance(): string {
    const km = distanceKm(HOME, COORDS[this.selected.id])
    return km.toLocaleString('fr-CA') + ' km'
  }

  get localTime(): string {
    const now = new Date()
    const local = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + this.selected.tzOffset * 3600000)
    const pad = (n: number) => (n < 10 ? '0' : '') + n
    return `${pad(local.getHours())}:${pad(local.getMinutes())}`
  }

  get visitedCount(): number {
    return this.cityService.getAll().filter((city) => this.badgeService.isVisited(city.id)).length
  }

  selectRegion(region: string): void {
    this.region = region
    this.layout()
  }

  zoom(step: number): void {
    const next = Math.min(ZOOMS.length - 1, Math.max(0, this.zoomIndex + step))
    if (next !== this.zoomIndex) {
      this.zoomIndex = next
      this.layout()
      setTimeout(() => this.centerOn(this.selected))
    }
  }

  select(pin: Pin, args: any): void {
    this.selected = pin.city
    pulse(args.object)
  }

  onCard(args: any): void {
    popIn(args.object)
  }

  open(): void {
    this.routerExtensions.navigate(['../city', this.selected.id], { relativeTo: this.route })
  }

  // Au chargement, on centre la carte sur l'Europe et l'Afrique
  onScrollerLoaded(args: any): void {
    this.scroller = args.object as ScrollView
    setTimeout(() => this.centerOn(this.selected || this.cityService.getById(3)), 300)
  }

  private centerOn(city: City | null): void {
    if (!this.scroller || !city) return
    const { x } = project(COORDS[city.id][0], COORDS[city.id][1], this.width)
    this.scroller.scrollToHorizontalOffset(Math.max(0, x - Screen.mainScreen.widthDIPs / 2), true)
  }

  // Calcule la taille de la carte et la position de chaque épingle
  private layout(): void {
    this.width = Math.round(Screen.mainScreen.widthDIPs * ZOOMS[this.zoomIndex])
    this.height = Math.round(this.width * MAP_RATIO)
    this.pins = this.cityService
      .getAll()
      .filter((city) => this.region === 'Toutes' || city.region === this.region)
      .map((city) => {
        const { x, y } = project(COORDS[city.id][0], COORDS[city.id][1], this.width)
        return { city, x: Math.round(x - PIN / 2), y: Math.round(y - PIN / 2) }
      })
  }
}
