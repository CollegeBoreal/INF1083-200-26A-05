import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'

const NOTES_KEY = 'lounivers.notes'

export interface Note {
  text: string
  updated: string
}

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notes: { [cityId: number]: Note } = this.load()

  get count(): number {
    return Object.keys(this.notes).length
  }

  get(cityId: number): Note | null {
    return this.notes[cityId] || null
  }

  save(cityId: number, text: string): Note {
    const note = { text: text.trim(), updated: new Date().toISOString() }
    if (note.text) {
      this.notes[cityId] = note
    } else {
      delete this.notes[cityId]
    }
    ApplicationSettings.setString(NOTES_KEY, JSON.stringify(this.notes))
    return note
  }

  private load(): { [cityId: number]: Note } {
    try {
      return JSON.parse(ApplicationSettings.getString(NOTES_KEY, '{}'))
    } catch {
      return {}
    }
  }
}
