\# Introduction Ã  Angular - INF1083



\*\*Ã‰tudiant :\*\* Ouassim Ahmed Benamira  

\*\*Matricule :\*\* 300150564  

\*\*Programme :\*\* Techniques des systÃ¨mes informatiques



\---



\## Objectif



L'objectif de ce TP est de dÃ©couvrir Angular et de crÃ©er une premiÃ¨re application Web.



Dans ce TP, j'ai rÃ©alisÃ© :



\- La vÃ©rification de Node.js, npm et Angular CLI

\- La crÃ©ation d'une application Angular

\- La crÃ©ation du composant Accueil

\- Le Data Binding

\- Un Ã©vÃ©nement avec un bouton

\- Le routage Angular

\- L'exÃ©cution de l'application avec `ng serve`



\---



\## 1. Environnement Angular



J'ai vÃ©rifiÃ© les versions avec :



```powershell

node --version

npm --version

ng version

```



Versions utilisÃ©es :



\- Node.js : v24.21.0

\- npm : 11.19.0

\- Angular CLI : 22.2.2

\- Windows 64 bits



!\[Environnement Angular](images/01-environnement-angular.png)



\---



\## 2. CrÃ©ation du projet



J'ai crÃ©Ã© mon application Angular avec :



```powershell

ng new B300150564

```



Le projet utilise le routage Angular et CSS.



\---



\## 3. Composant Accueil



J'ai crÃ©Ã© un composant nommÃ© `accueil`.



Le composant contient :



```typescript

titre = 'Bienvenue INF1083';



saluer() {

&#x20; alert('Bonjour !');

}

```



Dans le fichier HTML :



```html

<h1>{{ titre }}</h1>



<button (click)="saluer()">

&#x20; Cliquez-moi

</button>

```



Cela permet d'utiliser le Data Binding et un Ã©vÃ©nement `click`.



!\[Composant Accueil](images/02-composant-accueil.png)



\---



\## 4. Routage Angular



J'ai configurÃ© la route principale pour afficher le composant Accueil.



```typescript

export const routes: Routes = \[

&#x20; {

&#x20;   path: '',

&#x20;   component: Accueil

&#x20; }

];

```



!\[Routage Angular](images/03-routage-angular.png)



\---



\## 5. ExÃ©cution de l'application



Pour lancer l'application :



```powershell

ng serve

```



L'application est disponible sur :



```text

http://localhost:4200/

```



!\[Serveur Angular](images/04-serveur-angular.png)



\---



\## 6. RÃ©sultat final



L'application affiche le titre \*\*Bienvenue INF1083\*\* et le bouton \*\*Cliquez-moi\*\*.



Quand je clique sur le bouton, la fonction `saluer()` affiche le message `Bonjour !`.



!\[Application Angular](images/06-application-angular-finale.png)



\---



\## Conclusion



Ce TP m'a permis d'apprendre les bases d'Angular, de crÃ©er un composant, d'utiliser le Data Binding, de gÃ©rer un Ã©vÃ©nement, de configurer le routage et d'exÃ©cuter une application Angular.


