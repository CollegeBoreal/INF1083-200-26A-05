import { Injectable } from '@angular/core';
import { CoreTypes } from '@nativescript/core';
import * as Geolocation from '@nativescript/geolocation';

@Injectable({ providedIn: 'root' })
export class LocationService {
  // Demande l'accès à la localisation (affiche le choix du système
  // si pas encore décidé : « Pendant l'utilisation » / « Une seule
  // fois » / « Ne pas autoriser ») puis renvoie la position GPS.
  // Renvoie null si l'accès est refusé ou la position introuvable.
  async getCurrentPosition(): Promise<{ latitude: number; longitude: number } | null> {
    try {
      await Geolocation.enableLocationRequest();
      const location = await Geolocation.getCurrentLocation({
        desiredAccuracy: CoreTypes.Accuracy.high,
        maximumAge: 10000,
        timeout: 5000,
      });
      if (!location) {
        return null;
      }
      return { latitude: location.latitude, longitude: location.longitude };
    } catch (e) {
      return null;
    }
  }
}