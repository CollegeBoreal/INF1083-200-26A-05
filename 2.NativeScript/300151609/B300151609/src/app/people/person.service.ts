import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({ providedIn: 'root' })
export class PersonService {

  items = signal<Person[]>([
    { id: 1, name: 'James Gosling', nationality: 'Canadian', notableAchievements: ['Creator of Java programming language', 'Contributor to distributed computing systems'] },
    { id: 2, name: 'Margaret Hamilton', nationality: 'American', notableAchievements: ['Led Apollo software development', 'Popularized Software Engineering'] },
    { id: 3, name: 'Guido van Rossum', nationality: 'Dutch', notableAchievements: ['Creator of Python programming language', 'Advocate for code readability'] },
    { id: 4, name: 'Barbara Liskov', nationality: 'American', notableAchievements: ['Developed the Liskov Substitution Principle', 'Turing Award winner'] },
    { id: 5, name: 'Ken Thompson', nationality: 'American', notableAchievements: ['Co-creator of Unix', 'Creator of the B programming language'] },
    { id: 6, name: 'Vint Cerf', nationality: 'American', notableAchievements: ['Co-designer of TCP/IP', 'Father of the Internet'] },
    { id: 7, name: 'Radia Perlman', nationality: 'American', notableAchievements: ['Invented Spanning Tree Protocol', 'Known as Mother of the Internet'] },
    { id: 8, name: 'Anders Hejlsberg', nationality: 'Danish', notableAchievements: ['Lead architect of C#', 'Creator of Turbo Pascal'] },
    { id: 9, name: 'Brian Kernighan', nationality: 'Canadian', notableAchievements: ['Co-author of The C Programming Language', 'Contributor to Unix development'] },
    { id: 10, name: 'Robert Kahn', nationality: 'American', notableAchievements: ['Co-inventor of TCP/IP', 'Internet architecture pioneer'] },
    { id: 11, name: 'Sophie Wilson', nationality: 'British', notableAchievements: ['Designed the ARM instruction set', 'Key contributor to Acorn Computers'] },
    { id: 12, name: 'John Carmack', nationality: 'American', notableAchievements: ['Pioneer of 3D game engines', 'Co-founder of id Software'] },
    { id: 13, name: 'Frances Allen', nationality: 'American', notableAchievements: ['Compiler optimization pioneer', 'First female Turing Award winner'] },
    { id: 14, name: 'Fernando Corbató', nationality: 'American', notableAchievements: ['Invented computer password systems', 'Pioneer of time-sharing systems'] },
    { id: 15, name: 'Donald Chamberlin', nationality: 'American', notableAchievements: ['Co-creator of SQL', 'Database systems pioneer'] }
  ]);

  getPerson(id: number): Person | undefined {
    return this.items().find((person) => person.id === id);
  }
}