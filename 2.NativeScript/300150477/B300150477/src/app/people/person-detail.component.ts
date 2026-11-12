import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { LanguageService } from './language.service';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'ns-person-detail',
  templateUrl: './person-detail.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonDetailComponent implements OnInit {
  readonly personService = inject(PersonService);
  readonly languageService = inject(LanguageService);
  private readonly routerExtensions = inject(RouterExtensions);
  private readonly route = inject(ActivatedRoute);
  readonly person = signal<Person | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.person.set(this.personService.getPerson(id) ?? null);
  }

  displayName(person: Person): string {
    return this.languageService.language() === 'tz' ? person.nameTifinagh : person.name;
  }

  displayTerritory(person: Person): string {
    return this.languageService.language() === 'tz' ? person.territoryTifinagh : person.territoryFr;
  }

  formatHistory(person: Person): string {
    const points = this.languageService.language() === 'tz' ? person.historyTifinagh : person.historyFr;
    return points.map((point, index) => `${index + 1}. ${point}`).join('\n');
  }

  goBack(): void {
    this.routerExtensions.back();
  }
}
