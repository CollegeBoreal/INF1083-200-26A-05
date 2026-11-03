# RxJS

[ 🎉 Participation](.scripts/Participation.md)


## 🚀 Créer votre répertoire


- [ ] Créer un répertoire avec son 🆔 et ajouter le fichier README.md et un répertoire `images` 🖼️


## Pourquoi RxJS ?

RxJS permet de manipuler des flux de données asynchrones à l'aide d'observables.

https://rxjs-dev.firebaseapp.com/guide/overview

### 📖 JS vs RxJS

Voir la documentation du cours.

### 📖 Exemples

https://www.pluralsight.com/guides/using-http-with-rxjs-observables

---

# 🛰️ Construire un accès à des données

Le projet utilise :

- `HttpClientModule`
- `NativeScriptFormsModule`
- Template Driven Forms (`ngModel`)

### 📦 Obtenir une clé RapidAPI

Inscrivez-vous sur :

https://rapidapi.com/

Puis récupérez votre clé API.

<image src="images/RapidAPIKey.png" width=50% heigth=50%> </image>

---

# 🅰️ Créer un projet

Créer un projet avec votre numéro étudiant 🆔 comme nom.

Exemple :

```bash
ns create b🆔 --template @nativescript/template-tab-navigation-ng
```

| Commande | Description |
|-----------|-----------|
| `$ ns create b`:id:` --template @nativescript/template-tab-navigation-ng`    |  Application avec onglets         

Ouvrir ensuite le projet dans VS Code :

```bash
cd b🆔
code .
```

---

# ⚠️ Important

Les modèles Angular NativeScript récents ne possèdent pas toujours un fichier :

```text
angular.json
```

Par conséquent les commandes suivantes ne fonctionnent pas :

```bash
ng generate class
ng generate service
ng generate component
```

Les fichiers TypeScript seront créés manuellement.

---

# 🅱️ Créer le modèle de données

Créer le dossier partagé :

```bash
mkdir -p src/app/shared
```

Créer le fichier :

```bash
touch src/app/shared/country.ts
```

Contenu :

```typescript
export class Country {
    id: number;
    name: string;
    capital: string;
}
```

---

# 🅲️ Créer le service APICall

Créer le fichier :

```bash
touch src/app/shared/apicall.service.ts
```

Contenu :

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    searchCountryByName(name: string): Observable<Country[]> {

        let headers: HttpHeaders = new HttpHeaders();

        headers = headers.append('Accept', 'application/json');

        headers = headers.append(
            'X-RapidAPI-Key',
            'VOTRE_CLE_RAPID_API'
        );

        return this.httpClient
            .get(
                'https://restcountries-v1.p.rapidapi.com/capital/' + name,
                { headers }
            )
            .pipe(
                map((data: Country[]) => data),
                catchError(error => {
                    return throwError(
                        () => 'Capital not found!'
                    );
                })
            );
    }
}
```

---

# 🅳️ Ajouter HttpClient au projet

Dans :

```text
src/app/app.module.ts
```

Ajouter :

```typescript
import {
    NativeScriptHttpClientModule
} from '@nativescript/angular';
```

Puis dans :

```typescript
@NgModule({
    imports: [
```

ajouter :

```typescript
NativeScriptHttpClientModule,
```

Exemple :

```typescript
@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule
    ]
})
```

---

# 🆎 Modifier le composant Search

Ouvrir :

```text
src/app/search/search.component.ts
```

Ajouter :

```typescript
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';
```

Ajouter les propriétés :

```typescript
name: string;
countries: Array<Country>;
```

Modifier le constructeur :

```typescript
constructor(
    private apiService: ApicallService
) {}
```

Ajouter :

```typescript
searchCapital() {
    this.apiService
        .searchCountryByName(this.name)
        .subscribe((data: Country[]) => {

            console.log(data);

            this.countries = data;
        });
}
```

Résultat :

```typescript
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html'
})
export class SearchComponent
implements OnInit {

    name: string;

    countries: Array<Country>;

    constructor(
        private apiService: ApicallService
    ) {}

    ngOnInit(): void {}

    searchCapital() {
        this.apiService
            .searchCountryByName(this.name)
            .subscribe(
                (data: Country[]) => {

                    console.log(data);

                    this.countries = data;
                }
            );
    }
}
```

---

# 🆑 Modifier le template Search

Ouvrir :

```text
src/app/search/search.component.html
```

Remplacer :

```html
<Label
    class="page__content-placeholder"
    text="<!-- Search page content goes here -->">
</Label>
```

par :

```html
<StackLayout class="form">

    <TextField
        class="input"
        hint="Capital"
        [(ngModel)]="name">
    </TextField>

    <Button
        text="Search"
        class="btn btn-primary"
        (tap)="searchCapital()">
    </Button>

    <ListView
        [items]="countries"
        height="650">

        <ng-template let-item="item">

            <StackLayout>

                <Label
                    [text]="item.name">
                </Label>

                <Label
                    [text]="item.capital">
                </Label>

            </StackLayout>

        </ng-template>

    </ListView>

</StackLayout>
```

---

# 📝 Notes

Utilisation du binding Angular :

```html
[(ngModel)]="name"
```

pour lier :

```typescript
name: string;
```

Utilisation de :

```html
[tap]="..."
```

pour lancer une action lorsqu'un bouton est touché.

Utilisation de :

```html
[items]="countries"
```

pour afficher une collection dans une liste.

---

# 🆖 Activer les formulaires Angular

Dans :

```text
src/app/search/search.module.ts
```

Ajouter :

```typescript
import {
    NativeScriptFormsModule
} from '@nativescript/angular';
```

Ajouter ensuite dans :

```typescript
imports :
   NativeScriptFormsModule,
```

Exemple :

```typescript
@NgModule({
    imports: [
        CommonModule,
        NativeScriptFormsModule
    ]
})
```

---

# ✅ Résultat attendu

L'utilisateur :

1. Saisit une capitale dans le champ texte.
2. Appuie sur le bouton **Search**.
3. Le service Angular utilise `HttpClient`.
4. RxJS retourne un `Observable<Country[]>`.
5. Les pays correspondants s'affichent dans le `ListView`.

---

# Références

- https://rxjs-dev.firebaseapp.com/guide/overview
- https://angular.io/guide/forms-overview
- https://rapidapi.com/
- https://docs.nativescript.org/angular/ng-framework-modules/http
