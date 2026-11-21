import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import {
  Application,
  ApplicationSettings
} from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  maintenanceReminders = true
  distanceUnit = 'km'

  ngOnInit(): void {
    this.loadSettings()
  }

  loadSettings(): void {
    this.maintenanceReminders =
      ApplicationSettings.getBoolean(
        'carcare_maintenance_reminders',
        true
      )

    this.distanceUnit =
      ApplicationSettings.getString(
        'carcare_distance_unit',
        'km'
      )
  }

  onReminderChange(args: any): void {
    this.maintenanceReminders = args.object.checked

    ApplicationSettings.setBoolean(
      'carcare_maintenance_reminders',
      this.maintenanceReminders
    )
  }

  setDistanceUnit(unit: string): void {
    this.distanceUnit = unit

    ApplicationSettings.setString(
      'carcare_distance_unit',
      unit
    )
  }

  resetSettings(): void {
    this.maintenanceReminders = true
    this.distanceUnit = 'km'

    ApplicationSettings.setBoolean(
      'carcare_maintenance_reminders',
      true
    )

    ApplicationSettings.setString(
      'carcare_distance_unit',
      'km'
    )
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}