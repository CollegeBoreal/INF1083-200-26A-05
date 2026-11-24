## Développement d'une application mobile avec NativeScript, Angular et RxJS

**Nom de l'étudiant :** Bourhane Kessouri  
**Numéro d'étudiant :** 300150411  
**Cours :** Développement d'applications  
**Projet :** Recherche de pays par capitale  

---

## 1. Introduction

Dans ce travail, j'ai réalisé une application mobile avec NativeScript et Angular. L'objectif est de permettre à l'utilisateur de rechercher des pays à partir du nom d'une capitale.

Pour réaliser cette application, j'ai utilisé une API qui fournit des informations sur les pays. J'ai également utilisé RxJS pour gérer les requêtes HTTP et récupérer les résultats.

Le projet m'a permis de pratiquer la création d'une application mobile, l'organisation des fichiers, l'utilisation des services Angular et la communication avec une API externe.

## 2. Création du projet

J'ai commencé par créer un projet NativeScript avec le modèle Angular.

Commande utilisée dans PowerShell :

```powershell
ns create B300150411 --template @nativescript/template-tab-navigation-ng
```

Ensuite, je suis entré dans le dossier du projet :

```powershell
cd B300150411
```

J'ai ouvert le projet dans Visual Studio Code pour créer et modifier les différents fichiers.

## 3. Organisation du projet

Le projet contient plusieurs dossiers et fichiers. J'ai principalement travaillé dans le dossier `src/app`.

Les fichiers principaux sont :

- `country.ts` : définit la structure des informations d'un pays.
- `apicall.service.ts` : communique avec l'API.
- `search.component.ts` : contient la logique de recherche.
- `search.component.html` : contient l'interface de recherche.
- `search.module.ts` : configure le module de recherche.
- `app.module.ts` : configure les modules principaux de l'application.

J'ai également créé un dossier `images` pour conserver les captures d'écran du travail.

## 4. Création de la classe Country

J'ai créé le fichier `src/app/shared/country.ts`.

Cette classe représente les informations d'un pays. Elle contient trois propriétés : l'identifiant, le nom du pays et sa capitale.

**Code utilisé :**

```typescript
export class Country {
    id: number;
    name: string;
    capital: string;
}
```

Cette classe permet de structurer les données récupérées depuis l'API.

## 5. Création du service API

J'ai créé le fichier `src/app/shared/apicall.service.ts`.

Ce service permet de communiquer avec l'API externe en utilisant `HttpClient`.

L'adresse utilisée est :

```text
https://countries.nexperts.nl/capital/
```

J'ai utilisé plusieurs éléments de RxJS :

- `Observable` : permet de gérer les données reçues de manière asynchrone.
- `map()` : transforme les données reçues en objets de type Country.
- `catchError()` : permet de gérer les erreurs.
- `throwError()` : retourne une erreur lorsque la requête échoue.

**Code utilisé :**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private http: HttpClient) { }

    searchCountryByName(name: string): Observable<Country[]> {
        return this.http.get<any>(
            'https://countries.nexperts.nl/capital/' + name
        ).pipe(
            map(data => data.map((c: any, i: number) => ({
                id: i,
                name: c.name.common,
                capital: c.capital ? c.capital[0] : ''
            } as Country))),
            catchError(() => throwError(() => 'Capital not found!'))
        );
    }
}
```

Le service reçoit le nom de la capitale, effectue une requête HTTP et transforme les résultats pour les utiliser dans l'application.

## 6. Configuration du module principal

Dans le fichier `src/app/app.module.ts`, j'ai ajouté `NativeScriptHttpClientModule`.

Ce module permet d'utiliser les requêtes HTTP dans l'application NativeScript.

**Code utilisé :**

```typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    NativeScriptModule,
    NativeScriptHttpClientModule
} from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
```

## 7. Création du composant de recherche

J'ai créé le composant qui permet à l'utilisateur de saisir le nom d'une capitale et de lancer la recherche.

Dans le fichier `search.component.ts`, j'ai déclaré deux variables :

- `name` : contient le texte saisi par l'utilisateur.
- `countries` : contient les résultats de la recherche.

La méthode `searchCapital()` appelle le service API et utilise `subscribe()` pour recevoir les résultats.

**Code utilisé :**

```typescript
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    standalone: false,
    selector: 'Search',
    templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

    name: string = '';
    countries: Country[] = [];

    constructor(private api: ApicallService) {}

    ngOnInit(): void {}

    searchCapital(): void {
        if (!this.name.trim()) {
            return;
        }

        this.api.searchCountryByName(this.name.trim()).subscribe({
            next: (data: Country[]) => {
                this.countries = data;
            },
            error: (err) => {
                console.log(err);
                this.countries = [];
            }
        });
    }
}
```

La méthode vérifie d'abord que le champ n'est pas vide. Ensuite, elle appelle le service et affiche les données reçues dans la liste des pays.

## 8. Création de l'interface utilisateur

Dans le fichier `search.component.html`, j'ai créé l'interface de recherche.

Elle contient :

- Un titre qui présente la fonction de recherche.
- Un champ de texte pour saisir une capitale.
- Un bouton pour lancer la recherche.
- Une liste pour afficher les pays et leurs capitales.

**Code utilisé :**

```html
<StackLayout class="p-20">

    <Label text="Recherche des pays par capitale"
           class="h2 text-center">
    </Label>

    <TextField
        hint="Entrez une capitale (ex: Paris)"
        [(ngModel)]="name">
    </TextField>

    <Button
        text="Rechercher"
        (tap)="searchCapital()"
        class="btn btn-primary">
    </Button>

    <ListView [items]="countries" height="400">
        <ng-template let-country="item">
            <StackLayout class="p-10">
                <Label [text]="'Pays : ' + country.name"
                       class="h3">
                </Label>

                <Label [text]="'Capitale : ' + country.capital">
                </Label>
            </StackLayout>
        </ng-template>
    </ListView>

</StackLayout>
```

La liaison `[(ngModel)]` permet de récupérer le texte saisi. Le bouton utilise l'événement `(tap)` pour appeler la méthode de recherche. La liste `ListView` affiche les résultats.

## 9. Configuration du module de recherche

Dans `search.module.ts`, j'ai ajouté `NativeScriptFormsModule` pour permettre l'utilisation de `ngModel` dans le champ de saisie.

**Code utilisé :**

```typescript
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import {
    NativeScriptCommonModule,
    NativeScriptFormsModule
} from '@nativescript/angular';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        SearchRoutingModule
    ],
    declarations: [SearchComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
```

Le module permet de charger le composant de recherche et ses fonctionnalités.

## 10. Vérification du code

Après avoir créé et modifié les fichiers, j'ai vérifié le code TypeScript avec la commande suivante :

```powershell
npx tsc --noEmit
```

Cette commande s'est exécutée sans afficher d'erreur TypeScript.

Cela m'a permis de vérifier que le code TypeScript pouvait être compilé sans erreur détectée par cette vérification.

## 11. Configuration de l'environnement Android

Pour préparer l'exécution de l'application sur Android, j'ai installé et configuré les outils nécessaires :

- Java JDK 17.
- Android SDK.
- Android Build Tools.
- Android Platform Tools.
- Android Emulator.
- Une image système Android 36.

J'ai également ajouté la plateforme Android au projet avec la commande :

```powershell
ns platform add android
```

La plateforme Android a été ajoutée avec succès.

## 12. Compilation de l'application

J'ai lancé la compilation Android avec la commande :

```powershell
ns build android
```

La compilation s'est terminée avec le message :

```text
Project successfully built.
```

Le fichier APK généré se trouve dans le chemin suivant :

```text
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

Cette étape confirme que le projet a été compilé pour Android.

## 13. Préparation de l'émulateur Android

J'ai créé un émulateur Android nommé `Pixel_6_API_36`.

Cependant, lors du lancement de l'émulateur, j'ai rencontré un problème lié à l'accélération matérielle.

Le message affiché indiquait que la virtualisation matérielle était désactivée ou que le pilote nécessaire n'était pas installé.

Après vérification dans le Gestionnaire des tâches de Windows, j'ai constaté que la virtualisation était désactivée.

Il reste donc à activer la virtualisation dans le BIOS de l'ordinateur Lenovo avant de pouvoir lancer l'émulateur et effectuer les tests visuels de l'application.

## 14. Captures d'écran du projet

J'ai créé un dossier `images` à la racine du projet pour regrouper les preuves visuelles de mon travail.

Les captures prévues sont les suivantes :

| Fichier | Contenu de la capture |
|---|---|
| `01-structure-projet.png` | Organisation des dossiers dans VS Code |
| `02-model-country.png` | Code de la classe Country |
| `03-service-api.png` | Service API et opérateurs RxJS |
| `04-composant-recherche.png` | Code du composant TypeScript |
| `05-interface-code.png` | Code de l'interface HTML NativeScript |
| `06-compilation.png` | Résultat de la compilation Android |
| `07-application.png` | Application ouverte dans l'émulateur |
| `08-resultat-recherche.png` | Résultat d'une recherche dans l'application |

Les captures 7 et 8 seront ajoutées après le démarrage de l'émulateur et la réalisation des tests.

## 15. Conclusion

Ce travail m'a permis de découvrir et de pratiquer plusieurs technologies utilisées dans le développement d'applications mobiles.

J'ai appris à créer un projet NativeScript avec Angular, à organiser les fichiers, à créer un service, à communiquer avec une API externe et à utiliser les fonctionnalités de RxJS comme `Observable`, `map()`, `catchError()` et `subscribe()`.

J'ai également appris à préparer l'environnement Android et à compiler un projet pour cette plateforme.

La compilation Android a réussi et le fichier APK a été généré. Il reste à résoudre le problème de virtualisation pour démarrer l'émulateur et terminer les tests visuels de l'application.

<image src=images/9999.png width=50% height=50% > </image>
<image src=images/1000.png width=50% height=50% > </image>

