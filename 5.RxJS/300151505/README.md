# 🌍 RxJS — Recherche de pays par capitale — INF1083

**Étudiant :** Aidene Arezki  
**Matricule :** 300151505  
**GitHub :** [300151505](https://github.com/300151505)  
**Cours :** INF1083 — Développement d'applications  
**Session :** Automne 2026  

---

## 🎯 Objectif

Construire un accès à des données dans une application **NativeScript Angular** avec :

- **RxJS** (`Observable`, `pipe`, `map`, `catchError`, `subscribe`)
- **`HttpClient`** (`NativeScriptHttpClientModule`)
- **Template Driven Forms** (`[(ngModel)]` avec `NativeScriptFormsModule`)

L'utilisateur tape une **capitale**, appuie sur **Search**, et les pays correspondants s'affichent dans un `ListView`.

> ℹ️ Travail réalisé sur l'ordinateur d'un ami (session Windows `louni`), avec mon propre dépôt et mon compte GitHub.

Projet réalisé : **`b300151505`** (modèle *tab-navigation-ng*, NativeScript 9 + Angular 22, émulateur Pixel 7 — Android 15)

```text
5.RxJS/300151505/
├── README.md
├── images/
└── b300151505/
    └── src/app/
        ├── app.module.ts                  ← 🅳️ NativeScriptHttpClientModule
        ├── shared/
        │   ├── country.ts                 ← 🅱️ modèle Country
        │   └── apicall.service.ts         ← 🅲️ service RxJS + HttpClient
        └── search/
            ├── search.module.ts           ← 🆖 NativeScriptFormsModule
            ├── search.component.ts        ← 🆎 searchCapital()
            └── search.component.html      ← 🆑 TextField + Button + ListView
```

---

## ▶️ Exécuter le projet

```powershell
cd 5.RxJS\300151505\b300151505
ns run android
```

Puis ouvrir l'onglet **Search** 🔍.

---

## 🅰️ 1. Création du projet

```powershell
cd 5.RxJS\300151505
ns create b300151505 --template @nativescript/template-tab-navigation-ng
```

<img src="images/01-ns-create.png" width="70%" alt="ns create">

---

## 🅱️ 2. Modèle de données — `shared/country.ts`

```typescript
export class Country {
  id!: number;
  name!: string;
  capital!: string;
}
```

## 🅲️ 3. Service — `shared/apicall.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ApicallService {

  constructor(private httpClient: HttpClient) {}

  searchCountryByName(name: string): Observable<Country[]> {
    const capitale = encodeURIComponent(name.trim());

    return this.httpClient
      .get<any[]>('https://countries.nexperts.nl/capital/' + capitale)
      .pipe(
        // API de secours si la 1re ne répond pas (même format de réponse)
        catchError(() =>
          this.httpClient.get<any[]>('https://restcountries.com/v3.1/capital/' + capitale)
        ),
        // map : transformer la réponse en tableau de Country
        map((data: any[]) =>
          data.map((c, i) => ({
            id: i,
            name: c.name.common,
            capital: c.capital ? c.capital[0] : '',
          }) as Country)
        ),
        // catchError : message clair si la capitale n'existe pas
        catchError(() => throwError(() => 'Capital not found!'))
      );
  }
}
```

| Opérateur RxJS | Rôle |
|---|---|
| `Observable<Country[]>` | flux de données asynchrone renvoyé par le service |
| `pipe()` | enchaîne les opérateurs |
| `map()` | transforme la réponse de l'API (`name.common` → `name`, `capital[0]` → `capital`) |
| `catchError()` | gère les erreurs (API de secours, puis message « Capital not found! ») |
| `throwError()` | renvoie une erreur dans l'Observable |
| `subscribe()` | déclenche la requête et reçoit les données (dans le composant) |

## 🅳️ 4. HttpClient — `app.module.ts`

```typescript
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular'

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptHttpClientModule, AppRoutingModule],
  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
```

## 🆖 5. Formulaires — `search/search.module.ts`

```typescript
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, SearchRoutingModule],
  declarations: [SearchComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
```

## 🆎 6. Composant — `search/search.component.ts`

```typescript
export class SearchComponent implements OnInit {

  name = ''
  countries = signal<Array<Country>>([])
  message = signal('')

  constructor(private apiService: ApicallService) {}

  ngOnInit(): void {}

  searchCapital() {
    this.apiService.searchCountryByName(this.name).subscribe({
      next: (data: Country[]) => {
        console.log(data)
        this.countries.set(data)
        this.message.set(data.length + ' résultat(s) pour « ' + this.name + ' »')
      },
      error: (erreur: string) => {
        console.log(erreur)
        this.countries.set([])
        this.message.set(erreur)
      },
    })
  }
}
```

> Angular 22 n'actualise plus l'écran automatiquement (mode *zoneless*) : j'utilise des **`signal()`** pour que la liste se mette à jour quand les données arrivent.

## 🆑 7. Template — `search/search.component.html`

```html
<StackLayout class="form p-4">

  <TextField class="input" hint="Capital" [(ngModel)]="name"></TextField>

  <Button text="Search" class="btn btn-primary" (tap)="searchCapital()"></Button>

  <Label [text]="message()" textWrap="true"></Label>

  <ListView [items]="countries()" height="650">
    <ng-template let-item="item">
      <StackLayout class="p-10">
        <Label [text]="item.name" class="h2"></Label>
        <Label [text]="'Capitale : ' + item.capital"></Label>
      </StackLayout>
    </ng-template>
  </ListView>

</StackLayout>
```

| Binding | Rôle |
|---|---|
| `[(ngModel)]="name"` | liaison bidirectionnelle entre le `TextField` et la propriété `name` |
| `(tap)="searchCapital()"` | lance la recherche quand on touche le bouton |
| `[items]="countries()"` | affiche la collection dans le `ListView` |

---

## ✅ 8. Résultat

| Recherche « Algiers » (Alger 🇩🇿) | Recherche « Ottawa » 🇨🇦 |
|---|---|
| <img src="images/02-recherche-algiers.png" width="280" alt="Algiers"> | <img src="images/03-recherche-ottawa.png" width="280" alt="Ottawa"> |

> Le texte a été saisi avec `adb shell input text "Algiers"` (coller directement sur l'émulateur faisait passer l'application en arrière-plan).

Données reçues dans la console (`console.log(data)`), lues avec `adb logcat` :

```powershell
adb logcat -d -s JS | Select-String "Algeria|Canada"
```

<img src="images/04-console.png" width="70%" alt="Console">

```text
CONSOLE LOG: [ { id: 0, name: "Algeria", capital: "Algiers" } ]
CONSOLE LOG: [ { id: 0, name: "Canada", capital: "Ottawa" } ]
```

---

## ⚠️ Notes

- **API :** l'API du labo sur RapidAPI (restcountries-v1) ne répond plus. Le service utilise l'API publique **countries.nexperts.nl** (gratuite, sans clé, même route `/capital/{nom}`), avec **restcountries.com v3.1** comme API de secours grâce à `catchError`.
- **Premier lancement :** `Application ... is not running` apparaît parfois juste après l'installation ; il suffit de relancer `ns run android`.
- **Console :** après un redémarrage, les `console.log` ne s'affichaient pas dans la fenêtre de `ns run android` ; je les ai lus avec `adb logcat -s JS`.
- **API :** l'API attend le nom de la capitale en anglais (`Algiers` pour Alger).

## 📝 Conclusion

Dans ce laboratoire, j'ai appris à séparer l'accès aux données (le service `ApicallService`) de l'affichage (le composant `SearchComponent`). Le service renvoie un `Observable` : rien n'est envoyé à l'API tant que le composant n'appelle pas `subscribe()`. Les opérateurs `map` et `catchError` m'ont permis de transformer la réponse en objets `Country` et d'afficher un message clair quand une capitale n'existe pas. J'ai testé l'application avec la capitale de mon pays d'origine, l'Algérie, puis avec Ottawa.

---

<p align="center"><b>🛰️ INF1083 — RxJS | 300151505</b></p>
