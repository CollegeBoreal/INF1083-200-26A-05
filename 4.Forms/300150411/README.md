# 🚗 Formulaires — ReactiveForms avec NativeScript Angular

**Étudiant :** Bourhane Kessouri  
**Matricule :** 300150411  
**Programme :** TSIQ — Techniques des systèmes informatiques  
**Cours :** INF1083 — Développement d'applications

## 🎯 Objectif

L'objectif de ce laboratoire est de comprendre l'utilisation des formulaires avec Angular et NativeScript, particulièrement les ReactiveForms.

Le laboratoire demande de créer un formulaire contenant au minimum :

- Un champ Email ;
- Un champ Username ;
- Un bouton permettant de soumettre le formulaire ;
- L'affichage du courriel et du nom d'utilisateur dans la console.

Pour aller plus loin, j'ai personnalisé le projet en créant une application de réservation de voitures appelée **Car Rental** avec plusieurs informations supplémentaires.

## 📱 Projet réalisé

Le projet NativeScript utilisé est :

`B300150411`

Il se trouve dans :

`4.Forms/300150411/B300150411`

Le projet est basé sur NativeScript avec Angular et utilise les ReactiveForms.

## 🏗️ Création du projet

La commande utilisée pour créer le projet NativeScript Angular est :

```bash
ns create B300150411 --template @nativescript/template-blank-ng
```

Le projet peut ensuite être ouvert dans Visual Studio Code avec :

```bash
cd B300150411
code .
```

## 🧮 Formulaires réactifs

Pour gérer le formulaire, j'utilise les éléments suivants d'Angular :

- FormBuilder
- FormGroup
- ReactiveFormsModule
- Validators

Ils sont importés depuis :

`@angular/forms`

FormGroup représente le formulaire complet tandis que FormBuilder permet de créer et d'organiser les différents champs.

Validators.required permet d'indiquer qu'un champ est obligatoire.

## 📝 Formulaire Car Rental

Au lieu de créer uniquement les deux champs demandés, j'ai développé un formulaire plus complet pour une application de réservation de voitures (Car Rental).

Le formulaire contient :

- 👤 Nom complet (Full Name)
- 📧 Courriel (Email)
- 👤 Nom d'utilisateur (Username)
- 📞 Numéro de téléphone (Phone)
- 🚙 Type de voiture (Car Type)
- 📍 Lieu de retrait (Pick-up Location)
- 📅 Date de retrait (Pick-up Date)
- 📅 Date de retour (Return Date)
- 🛡️ Assurance complémentaire (Additional Insurance)

Les champs sont reliés au FormGroup avec formControlName.

Par exemple :

```html
<TextField
  formControlName="email"
  hint="Enter your email"
  keyboardType="email">
</TextField>

<TextField
  formControlName="username"
  hint="Enter your username">
</TextField>
```

## 👤 Informations personnelles

La première partie de l'application permet à l'utilisateur d'entrer ses informations personnelles.

Cette partie contient notamment les deux champs demandés dans le laboratoire :

- Email
- Username

J'ai également ajouté le nom complet et le numéro de téléphone afin de rendre le formulaire plus complet et réaliste.

**Figure 1 — Informations personnelles du formulaire Car Rental.**

[Insérer la capture d'écran de ton application ici.]

## 🚙 Informations de réservation

La deuxième partie permet d'entrer les informations concernant la réservation du véhicule.

L'utilisateur peut indiquer :

- Car Type
- Pick-up Location
- Pick-up Date
- Return Date
- Additional Insurance

Le bouton BOOK NOW déclenche l'événement Angular :

```html
(tap)="onBookNow()"
```

**Figure 2 — Informations de réservation et bouton BOOK NOW.**

[Insérer la capture d'écran de ton application ici.]

## ⚙️ Configuration du FormGroup

Le formulaire est créé avec FormBuilder.

```typescript
this.bookingForm = this.formBuilder.group({
  fullName: ['', Validators.required],
  email: ['', Validators.required],
  username: ['', Validators.required],
  phone: ['', Validators.required],
  carType: ['', Validators.required],
  pickupLocation: ['', Validators.required],
  pickupDate: ['', Validators.required],
  returnDate: ['', Validators.required],
  insurance: [false],
});
```

Chaque champ de l'interface correspond à une valeur du formulaire Angular.

Les champs principaux demandés dans le laboratoire sont :

```typescript
email: ['', Validators.required],
username: ['', Validators.required],
```

## 🖱️ Soumission du formulaire

Lorsque l'utilisateur appuie sur BOOK NOW, la méthode suivante est exécutée :

```typescript
onBookNow() {
  console.log('CAR RENTAL BOOKING');
  console.log('Full Name: ' + this.bookingForm.value.fullName);
  console.log('Email: ' + this.bookingForm.value.email);
  console.log('Username: ' + this.bookingForm.value.username);
  console.log('Phone: ' + this.bookingForm.value.phone);
  console.log('Car Type: ' + this.bookingForm.value.carType);
  console.log('Pick-up Location: ' + this.bookingForm.value.pickupLocation);
  console.log('Pick-up Date: ' + this.bookingForm.value.pickupDate);
  console.log('Return Date: ' + this.bookingForm.value.returnDate);
  console.log(
    'Additional Insurance: ' +
      (this.bookingForm.value.insurance ? 'Yes' : 'No')
  );
}
```

Cette méthode récupère les valeurs du bookingForm et les affiche dans la console.

## 💻 Résultat dans la console

Le laboratoire demande spécifiquement d'afficher le courriel et le nom d'utilisateur dans la console.

Après avoir rempli le formulaire et appuyé sur BOOK NOW, la console doit afficher les informations saisies, par exemple :

```text
CAR RENTAL BOOKING
Full Name: Bourhane Kessouri
Email: bourhane@example.com
Username: Bourhane411
Phone: 1234567890
Car Type: SUV
Pick-up Location: Toronto
Pick-up Date: 2026-12-01
Return Date: 2026-12-10
Additional Insurance: Yes
```

**Figure 3 — Valeurs du ReactiveForm affichées dans la console.**

[Insérer la capture d'écran réelle de la console ici.]

## 📲 Test sur Android

L'application peut être testée sur un émulateur Android.

Pour vérifier les appareils connectés, la commande suivante est utilisée :

```bash
adb devices
```

Pour exécuter l'application :

```bash
ns run android
```

Le test permet de vérifier que le formulaire s'affiche correctement et que les informations saisies apparaissent dans la console après avoir appuyé sur BOOK NOW.

## 📂 Structure du travail

```text
300150411/
├── README.md
├── images/
│   ├── .gitkeep
│   ├── 01-formulaire-informations.png
│   ├── 02-details-reservation.png
│   └── 03-console-formulaire.png
└── B300150411/
    └── src/
        └── app/
            └── home/
                ├── home.component.ts
                ├── home.component.html
                └── home.component.css
```

## ✅ Travail réalisé

Dans ce laboratoire, j'ai travaillé sur les éléments suivants :

- Utilisation de NativeScript avec Angular ;
- Utilisation des ReactiveForms ;
- Utilisation de FormBuilder et FormGroup ;
- Utilisation de Validators.required ;
- Création du champ Email ;
- Création du champ Username ;
- Liaison des champs avec formControlName ;
- Utilisation de l'événement (tap) ;
- Affichage du courriel dans la console ;
- Affichage du nom d'utilisateur dans la console ;
- Ajout de plusieurs champs supplémentaires ;
- Personnalisation de l'interface Car Rental ;
- Test du formulaire sur Android ;
- Vérification des résultats dans la console avec ADB.

## 📝 Conclusion

Ce laboratoire m'a permis de comprendre le fonctionnement des ReactiveForms avec Angular et NativeScript.

J'ai appris à créer un formulaire avec FormBuilder et FormGroup, à connecter les champs de l'interface avec formControlName et à récupérer les valeurs saisies par l'utilisateur lors d'un événement.

J'ai également personnalisé l'exercice en développant un formulaire de réservation de voitures Car Rental, ce qui m'a permis de mettre en pratique les notions apprises dans un exemple concret.

Le résultat attendu est que le courriel et le nom d'utilisateur soient correctement affichés dans la console, conformément aux consignes du laboratoire.

---

🚗 **INF1083 — Formulaires | 300150411**
