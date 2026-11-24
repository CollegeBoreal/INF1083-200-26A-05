import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  code: number;
  label: string;
  icon: string;
  time: string;
}

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

// Codes météo WMO -> libellé français + icône.
const WEATHER_LABELS: Record<number, { label: string; icon: string }> = {
  0: { label: 'Ciel dégagé', icon: '☀️' },
  1: { label: 'Plutôt dégagé', icon: '🌤️' },
  2: { label: 'Partiellement nuageux', icon: '⛅' },
  3: { label: 'Couvert', icon: '☁️' },
  45: { label: 'Brouillard', icon: '🌫️' },
  48: { label: 'Brouillard givrant', icon: '🌫️' },
  51: { label: 'Bruine légère', icon: '🌧️' },
  53: { label: 'Bruine', icon: '🌧️' },
  55: { label: 'Bruine forte', icon: '🌧️' },
  61: { label: 'Pluie légère', icon: '🌧️' },
  63: { label: 'Pluie', icon: '🌧️' },
  65: { label: 'Pluie forte', icon: '🌧️' },
  71: { label: 'Neige légère', icon: '❄️' },
  73: { label: 'Neige', icon: '❄️' },
  75: { label: 'Neige forte', icon: '❄️' },
  80: { label: 'Averses légères', icon: '🌧️' },
  81: { label: 'Averses', icon: '🌧️' },
  82: { label: 'Averses fortes', icon: '🌧️' },
  95: { label: 'Orage', icon: '⛈️' },
  96: { label: 'Orage avec grêle', icon: '⛈️' },
  99: { label: 'Orage avec grêle', icon: '⛈️' },
};

@Injectable({ providedIn: 'root' })
export class WeatherService {
  // Open-Meteo : météo gratuite, sans clé, pour Toronto (43.65, -79.38).
  private readonly url = 'https://api.open-meteo.com/v1/forecast?latitude=43.65&longitude=-79.38&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=America%2FToronto';

  constructor(private http: HttpClient) {}

  // Retourne la météo actuelle (Observable). En cas d'erreur réseau,
  // émet null pour que le tableau de bord affiche « indisponible ».
  getWeather(): Observable<Weather | null> {
    return this.http.get<OpenMeteoResponse>(this.url).pipe(
      map((res) => {
        const c = res.current;
        const info = WEATHER_LABELS[c.weather_code] ?? { label: 'Météo inconnue', icon: '🌡️' };
        return {
          temperature: Math.round(c.temperature_2m),
          humidity: c.relative_humidity_2m,
          windSpeed: Math.round(c.wind_speed_10m),
          code: c.weather_code,
          label: info.label,
          icon: info.icon,
          time: c.time,
        };
      }),
      catchError(() => of(null))
    );
  }
}
