import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { LanguageService } from './language.service'
import { PersonService } from './person.service'

@Component({
  selector: 'ns-person',
  templateUrl: './person.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent {
  readonly personService = inject(PersonService);
  readonly languageService = inject(LanguageService);

  displayName(name: string, nameTifinagh: string): string {
    return this.languageService.language() === 'tz' ? nameTifinagh : name;
  }

  displayTerritory(fr: string, tifinagh: string): string {
    return this.languageService.language() === 'tz' ? tifinagh : fr;
  }
}
