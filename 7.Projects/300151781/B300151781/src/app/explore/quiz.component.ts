import { Component, ElementRef, ViewChild } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'; import { ActivatedRoute } from '@angular/router'; import { RouterExtensions } from '@nativescript/angular'
import { City } from '../core/models/city'
import { CityService } from '../core/services/city.service'
import { popIn, pulse, shake } from '../shared/animations'

const BEST_KEY = 'lounivers.quiz.best'
const TOTAL_QUESTIONS = 5

@Component({
  standalone: false,
  selector: 'ns-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent {
  readonly total = TOTAL_QUESTIONS
  question = 0
  score = 0
  best = ApplicationSettings.getNumber(BEST_KEY, 0)
  answer: City
  choices: City[] = []
  picked: City | null = null
  finished = false
  @ViewChild('flagCard') flagCard: ElementRef

  constructor(private cityService: CityService, private routerExtensions: RouterExtensions, private route: ActivatedRoute) {
    this.restart()
  }

  get medal(): string {
    return this.score === this.total ? '🏆' : this.score >= 3 ? '🥈' : '🌱'
  }

  get verdict(): string {
    if (this.score === this.total) return 'Parfait ! Vous êtes un vrai globe-trotteur.'
    if (this.score >= 3) return 'Très bien ! Encore un petit voyage et ce sera parfait.'
    return 'Continuez d\'explorer Lounivers pour progresser.'
  }

  restart(): void {
    this.question = 0
    this.score = 0
    this.finished = false
    this.next()
  }

  pick(city: City, args: any): void {
    if (this.picked) return
    this.picked = city
    if (city.id === this.answer.id) {
      this.score++
      pulse(args.object)
    } else {
      shake(args.object)
    }
  }

  next(): void {
    if (this.question === this.total) {
      this.finished = true
      if (this.score > this.best) {
        this.best = this.score
        ApplicationSettings.setNumber(BEST_KEY, this.best)
      }
      return
    }
    this.question++
    this.picked = null
    // 4 villes de pays différents : une seule bonne réponse possible
    const countries = new Set<string>()
    this.choices = this.shuffle(this.cityService.getAll())
      .filter((city) => !countries.has(city.country) && !!countries.add(city.country))
      .slice(0, 4)
    this.answer = this.choices[Math.floor(Math.random() * 4)]
    setTimeout(() => this.flagCard && popIn(this.flagCard.nativeElement))
  }

  goBack(): void { this.routerExtensions.back({ relativeTo: this.route }) }

  onResult(args: any): void {
    popIn(args.object)
  }

  choiceClass(city: City): string {
    if (!this.picked) return 'quiz__choice'
    if (city.id === this.answer.id) return 'quiz__choice quiz__choice--good'
    if (city.id === this.picked.id) return 'quiz__choice quiz__choice--bad'
    return 'quiz__choice quiz__choice--dim'
  }

  private shuffle<T>(list: T[]): T[] {
    const copy = [...list]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }
}
