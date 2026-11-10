\# Labo RxJS — 300151781



:octocat: \[lounesallouti](https://github.com/lounesallouti) — INF1083



\## :bookmark\_tabs: Table des matières



\- \[🎯 Objectif](#-objectif)

\- \[🅰️ Création du projet](#️-création-du-projet)

\- \[🅱️ Modèle de données](#️-modèle-de-données)

\- \[🅲️ Service APICall (RxJS)](#️-service-apicall-rxjs)

\- \[🅳️ HttpClient](#️-httpclient)

\- \[🆎 Composant Search](#-composant-search)

\- \[🆑 Template Search](#-template-search)

\- \[🆖 Formulaires Angular](#-formulaires-angular)

\- \[⚠️ Note sur l'API](#️-note-sur-lapi)

\- \[▶️ Lancer l'application](#️-lancer-lapplication)

\- \[✅ Résultat](#-résultat)



\---



\## 🎯 Objectif



Comprendre \*\*RxJS\*\*, les \*\*Observables\*\* et \*\*HttpClient\*\* dans une application \*\*NativeScript Angular\*\*,

avec les \*\*Template Driven Forms\*\* (`ngModel`). L'application cherche un pays à partir du nom de sa capitale.



\## 🅰️ Création du projet



```bash

ns create b300151781 --template @nativescript/template-tab-navigation-ng

cd b300151781

code .

```



Le projet est dans le dossier \[`b300151781`](b300151781) (sans `node\_modules`, à réinstaller avec `npm install`).



Le template récent n'a pas de fichier `angular.json` : les commandes `ng generate` ne fonctionnent pas,

les fichiers TypeScript ont donc été créés à la main.



\## 🅱️ Modèle de données



Fichier \[`src/app/shared/country.ts`](b300151781/src/app/shared/country.ts) :



```typescript

export class Country {

&#x20; id: number

&#x20; name: string

&#x20; capital: string

}

```



\## 🅲️ Service APICall (RxJS)



Fichier \[`src/app/shared/apicall.service.ts`](b300151781/src/app/shared/apicall.service.ts).



La méthode `searchCountryByName()` retourne un \*\*`Observable<Country\[]>`\*\* :



| Élément RxJS | Rôle |

|---|---|

| `httpClient.get<any\[]>(...)` | Crée un Observable qui fait la requête HTTP quand on s'y abonne |

| `pipe(...)` | Enchaîne des opérateurs sur le flux de données |

| `map(...)` | Transforme la réponse de l'API (`name.common`, `capital\[0]`) en objets `Country` |

| `catchError(...)` | Intercepte une erreur HTTP et renvoie le message `Capital not found!` |

| `throwError(() => ...)` | Crée un Observable qui émet une erreur |



```typescript

searchCountryByName(name: string): Observable<Country\[]> {

&#x20; return this.httpClient.get<any\[]>('https://countries.nexperts.nl/capital/' + name).pipe(

&#x20;   map((data: any\[]) =>

&#x20;     data.map((c, i) => ({ id: i, name: c.name.common, capital: c.capital ? c.capital\[0] : '' }) as Country),

&#x20;   ),

&#x20;   catchError(() => throwError(() => 'Capital not found!')),

&#x20; )

}

```



\## 🅳️ HttpClient



Dans \[`src/app/app.module.ts`](b300151781/src/app/app.module.ts), ajout de `NativeScriptHttpClientModule`

pour pouvoir injecter `HttpClient` dans le service :



```typescript

imports: \[NativeScriptModule, NativeScriptHttpClientModule, AppRoutingModule],

```



\## 🆎 Composant Search



Fichier \[`src/app/search/search.component.ts`](b300151781/src/app/search/search.component.ts).



\- `name` : le texte saisi (lié au champ avec `ngModel`)

\- `countries` : la liste des pays affichée

\- `searchCapital()` : \*\*s'abonne\*\* (`subscribe`) à l'Observable du service



```typescript

searchCapital() {

&#x20; this.message = ''

&#x20; this.apiService.searchCountryByName(this.name).subscribe({

&#x20;   next: (data: Country\[]) => {

&#x20;     console.log(data)

&#x20;     this.countries = data

&#x20;   },

&#x20;   error: (err: string) => {

&#x20;     console.log(err)

&#x20;     this.countries = \[]

&#x20;     this.message = err

&#x20;   },

&#x20; })

}

```



En plus de l'énoncé, j'ai ajouté le callback \*\*`error`\*\* : si la capitale n'existe pas, le message

`Capital not found!` du `catchError` s'affiche à l'écran au lieu d'être ignoré.



\## 🆑 Template Search



Fichier \[`src/app/search/search.component.html`](b300151781/src/app/search/search.component.html) :



| Binding | Rôle |

|---|---|

| `\[(ngModel)]="name"` | Liaison bidirectionnelle entre le `TextField` et la propriété `name` |

| `(tap)="searchCapital()"` | Lance la recherche quand on touche le bouton |

| `\[items]="countries"` | Affiche la collection dans le `ListView` |

| `\*ngIf="message"` | Affiche le message d'erreur seulement s'il existe |



```html

<StackLayout class="form">

&#x20; <TextField class="input" hint="Capital" \[(ngModel)]="name"></TextField>

&#x20; <Button text="Search" class="btn btn-primary" (tap)="searchCapital()"></Button>

&#x20; <Label \*ngIf="message" \[text]="message" class="text-danger"></Label>

&#x20; <ListView \[items]="countries" height="650">

&#x20;   <ng-template let-item="item">

&#x20;     <StackLayout>

&#x20;       <Label \[text]="item.name"></Label>

&#x20;       <Label \[text]="item.capital"></Label>

&#x20;     </StackLayout>

&#x20;   </ng-template>

&#x20; </ListView>

</StackLayout>

```



\## 🆖 Formulaires Angular



Dans \[`src/app/search/search.module.ts`](b300151781/src/app/search/search.module.ts), ajout de

`NativeScriptFormsModule`, sans lequel `ngModel` ne fonctionne pas :



```typescript

imports: \[NativeScriptCommonModule, NativeScriptFormsModule, SearchRoutingModule],

```



\## ⚠️ Note sur l'API



L'ancienne API du labo (restcountries sur RapidAPI) ne répond plus. Le service utilise l'API publique

\*\*countries.nexperts.nl\*\*, gratuite et sans clé, qui offre le même point d'accès `/capital/{nom}`.

L'opérateur `map` adapte sa réponse au modèle `Country`.



\## ▶️ Lancer l'application



```bash

cd b300151781

npm install

ns run android

```



L'application a été testée sur l'émulateur Android \*\*Pixel 7\*\* (`emulator-5554`) :

`Project successfully built` puis `Successfully synced application org.nativescript.b300151781`.



\## ✅ Résultat



1\. Saisie de la capitale \*\*`Paris`\*\* dans le champ texte de l'onglet \*\*Search\*\*.

2\. Appui sur le bouton \*\*Search\*\*.

3\. Le service utilise `HttpClient`, et RxJS retourne un `Observable<Country\[]>`.

4\. Le pays \*\*France\*\* et sa capitale \*\*Paris\*\* s'affichent dans le `ListView`.



!\[Application](images/a1.png)



Le `console.log(data)` du composant affiche dans la console :

`\[ { id: 0, name: "France", capital: "Paris" } ]`



!\[Console](images/a2.png)

