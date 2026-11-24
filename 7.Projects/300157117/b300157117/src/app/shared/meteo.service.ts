import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

export interface JourMeteo {
  date: string
  emoji: string
  texte: string
  min: number
  max: number
}

export interface Meteo {
  temperature: number
  ressentie: number
  humidite: number
  vent: number
  emoji: string
  texte: string
  jours: JourMeteo[]
}

// 🌤️ Météo en direct de Toronto avec l'API gratuite Open-Meteo (sans clé)
@Injectable({
  providedIn: 'root',
})
export class MeteoService {
  private url =
    'https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832' +
    '&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=America%2FToronto&forecast_days=5'

  constructor(private http: HttpClient) {}

  getMeteo(): Observable<Meteo> {
    return this.http.get<any>(this.url).pipe(
      map((d) => ({
        temperature: Math.round(d.current.temperature_2m),
        ressentie: Math.round(d.current.apparent_temperature),
        humidite: d.current.relative_humidity_2m,
        vent: Math.round(d.current.wind_speed_10m),
        ...this.decrire(d.current.weather_code),
        jours: d.daily.time.map((date: string, i: number) => ({
          date: this.nomDuJour(date, i),
          ...this.decrire(d.daily.weather_code[i]),
          min: Math.round(d.daily.temperature_2m_min[i]),
          max: Math.round(d.daily.temperature_2m_max[i]),
        })),
      })),
      catchError(() => throwError(() => 'Météo indisponible. Vérifiez la connexion Internet.'))
    )
  }

  // Codes météo WMO → emoji + texte en français
  private decrire(code: number): { emoji: string; texte: string } {
    if (code === 0) return { emoji: '☀️', texte: 'Ensoleillé' }
    if (code <= 2) return { emoji: '🌤️', texte: 'Partiellement nuageux' }
    if (code === 3) return { emoji: '☁️', texte: 'Nuageux' }
    if (code <= 48) return { emoji: '🌫️', texte: 'Brouillard' }
    if (code <= 57) return { emoji: '🌦️', texte: 'Bruine' }
    if (code <= 67) return { emoji: '🌧️', texte: 'Pluie' }
    if (code <= 77) return { emoji: '❄️', texte: 'Neige' }
    if (code <= 82) return { emoji: '🌧️', texte: 'Averses' }
    if (code <= 86) return { emoji: '🌨️', texte: 'Averses de neige' }
    return { emoji: '⛈️', texte: 'Orage' }
  }

  private nomDuJour(date: string, i: number): string {
    if (i === 0) return "Aujourd'hui"
    const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    const [a, m, j] = date.split('-').map(Number)
    return jours[new Date(a, m - 1, j).getDay()]
  }
}
