import { Component } from '@angular/core'
import { EventData, TabView } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  /**
   * Les onglets sont créés par code avant le CSS : on donne la police
   * Font Awesome à chaque onglet puis on redessine son icône.
   */
  onTabsLoaded(args: EventData): void {
    const tabs = args.object as TabView
    for (const item of tabs.items || []) {
      const icon = item.iconSource
      ;(item as any).iconFontFamily = 'fa-solid-900'
      item.iconSource = null
      item.iconSource = icon
    }
  }
}
