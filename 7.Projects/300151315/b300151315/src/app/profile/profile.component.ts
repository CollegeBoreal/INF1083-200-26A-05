import { Component, inject } from '@angular/core'
import { Dialogs } from '@nativescript/core'

import { PlannerService, Profile } from '../shared/planner.service'
import { ReminderService } from '../shared/reminder.service'

@Component({
  standalone: false,
  selector: 'Profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  readonly p = inject(PlannerService)
  private readonly reminders = inject(ReminderService)

  form: Profile = { ...this.p.profile() }
  message = ''

  initials(): string {
    return this.p
      .profile()
      .name.split(' ')
      .map((w) => w[0] || '')
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  save(): void {
    if (!this.form.name.trim()) {
      this.message = 'Le nom est obligatoire.'
      return
    }
    this.p.updateProfile(this.form)
    this.message = '✔ Profil enregistré.'
  }

  onReminders(value: boolean): void {
    this.form.reminders = value
    this.p.updateProfile(this.form)
  }

  async testNotification(): Promise<void> {
    const ok = await this.reminders.test()
    this.message = ok ? '🔔 Notification dans 5 secondes…' : 'Permission des notifications refusée.'
  }

  async reset(): Promise<void> {
    const ok = await Dialogs.confirm({
      title: 'Réinitialiser ?',
      message: 'Les cours, les tâches et le profil reviennent aux exemples.',
      okButtonText: 'Réinitialiser',
      cancelButtonText: 'Annuler',
    })
    if (!ok) return
    this.p.reset()
    this.form = { ...this.p.profile() }
    this.message = 'Données réinitialisées.'
  }
}
