import { Component } from '@angular/core'
import { Switch } from '@nativescript/core'
import { shareText } from '@nativescript/social-share'
import { popIn } from '../shared/animations'
import { CityService } from '../core/services/city.service'
import { ThemeService } from '../core/services/theme.service'
import { BadgeService } from '../core/services/badge.service'

@Component({
  standalone: false,
  selector: 'ns-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly version = '3.0.0'
  readonly dark$ = this.themeService.dark$
  readonly totalCities = this.cityService.getAll().length

  readonly features = [
    { icon: '🧭', title: 'Explorer', text: '50 villes, recherche, filtres et tri' },
    { icon: '📷', title: 'Photos et histoire', text: 'Image et histoire de chaque ville via Wikipédia' },
    { icon: '🗣️', title: 'Phrases utiles', text: 'Bonjour, merci… dans 20 langues' },
    { icon: '🏅', title: 'Badges', text: '12 succès et 5 niveaux de voyageur' },
    { icon: '🎲', title: 'Surprends-moi', text: 'Une destination au hasard' },
    { icon: '✨', title: 'Destination du jour', text: 'Une nouvelle ville mise en avant chaque jour' },
    { icon: '🕒', title: 'Heure locale', text: 'L\'heure en direct dans chaque ville' },
    { icon: '♥', title: 'Favoris', text: 'Vos coups de cœur, sauvegardés sur le téléphone' },
    { icon: '🧳', title: 'Mon voyage', text: 'Villes à visiter et valise avec suivi de progression' },
    { icon: '💱', title: 'Convertisseur', text: 'Dollars canadiens convertis en monnaie locale' },
    { icon: '✈️', title: 'Compte à rebours', text: 'Les jours restants avant votre départ' },
    { icon: '🎯', title: 'Quiz des drapeaux', text: '5 questions et un meilleur score sauvegardé' },
    { icon: '📝', title: 'Carnet de voyage', text: 'Une note personnelle pour chaque ville' },
    { icon: '💰', title: 'Budget', text: 'Budget total, dépenses et reste à dépenser' },
    { icon: '🌙', title: 'Mode sombre', text: 'Un thème sombre élégant, mémorisé' },
    { icon: '✨', title: 'Animations', text: 'Cartes, cœur et quiz animés' },
    { icon: '↗', title: 'Partage', text: 'Envoyez une destination à vos proches' },
  ]

  readonly stack = ['NativeScript 9', 'Angular 22', 'TypeScript', 'RxJS', 'SCSS', 'social-share', 'Animations', 'Theme', 'HTTP', 'Wikipédia API']

  constructor(
    private cityService: CityService,
    private themeService: ThemeService,
    public badgeService: BadgeService,
  ) {}

  // Le type DOM d'Angular ne connaît pas Switch : on convertit l'argument
  onDark(args: any): void {
    this.themeService.setDark((args.object as Switch).checked)
  }

  onBrand(args: any): void {
    popIn(args.object)
  }

  shareApp(): void {
    shareText(
      `🌍 Je prépare mes voyages avec Lounivers : ${this.totalCities} destinations, photos, histoire, phrases utiles, badges, carnet, budget, quiz et mode sombre. Une application créée par Lounes Allouti.`,
      'Lounivers',
    )
  }
}
