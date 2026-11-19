# Forms — ReactiveForms avec NativeScript Angular

**Étudiant :** Arezki Aidene  
**Matricule :** 300151505  
**Programme :** TSIQ — Techniques des systèmes informatiques  
**Cours :** INF1083 — Développement d'applications

## 🎯 Objectif

L'objectif de ce laboratoire est de comprendre les formulaires ReactiveForms avec Angular et NativeScript.

Le laboratoire demande :
- Un champ Email
- Un champ Username
- Un bouton pour soumettre le formulaire
- L'affichage des informations dans la console

## 📱 Présentation du projet

Le projet B300151505 est une application Car Rental permettant de saisir des informations personnelles et les détails d'une location de voiture.

Chemin du projet : `4.Forms/300151505/B300151505`

## 🏗️ Structure du projet

```text
300151505/
├── README.md
├── images/
│   └── .gitkeep
└── B300151505/
    ├── package.json
    ├── nativescript.config.ts
    └── src/
        └── app/
            └── home/
                ├── home.component.html
                ├── home.component.ts
                └── home.component.css
```

## 🧮 ReactiveForms

Le formulaire utilise :
- FormBuilder pour créer les champs
- FormGroup pour regrouper les valeurs
- ReactiveFormsModule pour gérer le formulaire réactif
- Validators.required pour rendre certains champs obligatoires

## 📝 Formulaire Car Rental

Le formulaire contient :
- Full Name
- Email
- Username
- Phone Number
- Car Type
- Pick-up Location
- Pick-up Date
- Return Date
- Additional Insurance

Les champs sont associés au formulaire Angular à l'aide de `formControlName`.

## ⚙️ Configuration du formulaire

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

## 🖱️ Bouton BOOK NOW

Le bouton BOOK NOW utilise l'événement Angular :

```html
<Button text="BOOK NOW" (tap)="onBookNow()"></Button>
```

La méthode `onBookNow()` récupère les valeurs du formulaire et les affiche avec `console.log()`.

Les deux informations principales demandées sont :

```typescript
console.log('Email: ' + this.bookingForm.value.email);
console.log('Username: ' + this.bookingForm.value.username);
```

## 💻 Résultat attendu

Exemple de résultat attendu dans la console :

```text
CAR RENTAL BOOKING
Full Name: Arezki Aidene
Email: exemple@gmail.com
Username: Arezki123
Phone: 1234567890
Car Type: SUV
Pick-up Location: Toronto
Pick-up Date: 2026-11-20
Return Date: 2026-11-25
Additional Insurance: Yes
```

Ces valeurs sont des exemples. Le résultat réel sera vérifié pendant le test.

## 📲 Test sur Android

Pour vérifier les appareils disponibles :

```bash
adb devices
```

Pour lancer l'application depuis le répertoire B300151505 :

```bash
ns run android
```

**État :** test en attente. L'émulateur local n'a pas pu démarrer.

## 🖼️ Captures d'écran à ajouter

### Figure 1 — Informations personnelles

Capture à ajouter : `images/01-formulaire-informations.png`

### Figure 2 — Informations de location

Capture à ajouter : `images/02-details-location.png`

### Figure 3 — Résultat dans la console

Capture à ajouter : `images/03-console-formulaire.png`

## ✅ Avancement

- [x] Création du dossier étudiant
- [x] Ajout du projet NativeScript Angular
- [x] Présence des champs Email et Username
- [x] Configuration de FormBuilder et FormGroup
- [x] Utilisation de Validators.required
- [x] Présence du bouton BOOK NOW
- [x] Présence de console.log pour Email et Username
- [x] Dépôt des fichiers sur GitHub
- [ ] Test fonctionnel sur Android
- [ ] Vérification des résultats dans la console
- [ ] Ajout des captures d'écran

## 📝 Conclusion

Ce laboratoire permet de comprendre le fonctionnement des ReactiveForms avec NativeScript Angular. Le projet Car Rental utilise FormBuilder, FormGroup et Validators pour gérer les informations de réservation.

Les fichiers du formulaire sont préparés et déposés sur GitHub. La validation finale du fonctionnement et les captures d'écran restent à réaliser.

**Arezki Aidene — 300151505**
