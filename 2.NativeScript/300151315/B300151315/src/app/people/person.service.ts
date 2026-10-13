import { Injectable, signal } from '@angular/core';
import { Person } from './person';

// Application créée par Toumi Ayoub
@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: "Monkey D. Luffy", nationality: "East Blue", notableAchievements: ["Capitaine des Chapeaux de paille", "A mangé le fruit du Gomu Gomu", "Veut devenir le Roi des pirates"] },
    { id: 2, name: "Roronoa Zoro", nationality: "East Blue", notableAchievements: ["Sabreur de l'équipage", "Maîtrise le style à trois sabres", "Veut devenir le meilleur sabreur du monde"] },
    { id: 3, name: "Nami", nationality: "East Blue", notableAchievements: ["Navigatrice de l'équipage", "Veut dessiner la carte du monde entier"] },
    { id: 4, name: "Usopp", nationality: "East Blue", notableAchievements: ["Tireur d'élite de l'équipage", "Veut devenir un brave guerrier des mers"] },
    { id: 5, name: "Sanji", nationality: "North Blue", notableAchievements: ["Cuisinier de l'équipage", "Combat uniquement avec ses jambes", "Cherche l'All Blue"] },
    { id: 6, name: "Tony Tony Chopper", nationality: "Grand Line", notableAchievements: ["Médecin de l'équipage", "Renne qui a mangé le fruit du Hito Hito"] },
    { id: 7, name: "Nico Robin", nationality: "West Blue", notableAchievements: ["Archéologue de l'équipage", "Peut lire les Ponéglyphes"] },
    { id: 8, name: "Franky", nationality: "South Blue", notableAchievements: ["Charpentier de l'équipage", "A construit le Thousand Sunny"] },
    { id: 9, name: "Brook", nationality: "West Blue", notableAchievements: ["Musicien de l'équipage", "Squelette ramené à la vie par le fruit du Yomi Yomi"] },
    { id: 10, name: "Jinbe", nationality: "Île des Hommes-Poissons", notableAchievements: ["Timonier de l'équipage", "Ancien membre des Sept Grands Corsaires"] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}