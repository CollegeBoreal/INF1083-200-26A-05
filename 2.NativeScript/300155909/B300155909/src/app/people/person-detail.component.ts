import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'ns-person-detail',
  templateUrl: './person-detail.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly routerExtensions = inject(RouterExtensions);
  private readonly personService = inject(PersonService);
  readonly person = signal<Person | undefined>(undefined);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.person.set(this.personService.getPerson(id));
  }

  goBack(): void {
    this.routerExtensions.back();
  }

  formatAchievements(items: string[] | undefined): string {
    return (items ?? []).map((item, index) => `${index + 1}. ${item}`).join('\n');
  }
}
