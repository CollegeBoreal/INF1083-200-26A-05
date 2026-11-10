# 📱 Labo 6 - Animations

Projet : Application avec tiroir et animation
Étudiant : Idir Islam Chili

## 📖 Description
Application NativeScript + Angular avec deux types d'animations :
une animation déclarative en CSS et une animation impérative en code.

## 🎬 Animations
- 🎨 Declarative (CSS) : composant Home, un bouton {N} dont le fond
  passe du rouge à l'orange puis au vert en 3 secondes, en boucle,
  avec @keyframes dans home.component.scss.
- ⚡ Imperative (code) : composant Browse, un bouton "Animate" qui
  fait voler un avion ✈️ de gauche à droite dans un ciel bleu,
  avec la méthode animate() dans browse.component.ts. L'avion monte,
  fait demi-tour et revient, pendant que les nuages ☁️ défilent
  en sens inverse, comme un vrai vol.

## ✨ Version plus poli
- 🏠 Écran Home : fond dégradé violet-bleu, logo "N" blanc,
  titre "NativeScript" et sous-titre "Animations" qui apparaissent
  en fondu, flèche ↓ et bouton {N} en bas.
- ✈️ Écran Browse : avion ✈️ et nuages ☁️ dans un cadre bleu,
  vol de gauche à droite avec virage, mouvements en douceur
  (easeInOut, 1200 ms).

## 📁 Fichiers
- 🏠 src/app/home/home.component.html : logo, titre, sous-titre, bouton {N}
- 🎨 src/app/home/home.component.scss : @keyframes bgAnimation et fadeIn, dégradé
- 📝 src/app/home/home.component.ts : styleUrls home.component.scss
- 🔍 src/app/browse/browse.component.html : avion #cible, nuages #nuage1 et #nuage2, bouton Animate
- ⚡ src/app/browse/browse.component.ts : méthode animate(view, nuage1, nuage2)

## 🖼️ Captures
