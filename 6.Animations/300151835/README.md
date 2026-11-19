# Travail 6 — Animations NativeScript

**Liza Benhammouche · 300151835 · INF1083**

L’écran Home montre une animation CSS déclarative. L’écran Browse déclenche une animation impérative sur une image lors d’un appui. Les deux écrans conservent le menu latéral du modèle.

## 1. Créer le projet

```powershell
ns create b300151835 --template @nativescript/template-drawer-navigation-ng
Set-Location b300151835
```

## 2. Animer le bouton sur Home

Remplacer `src/app/home/home.component.html`.

```html
<ActionBar title="Accueil">
  <ActionItem text="Menu" (tap)="onDrawerButtonTap()" />
</ActionBar>
<StackLayout class="p-4">
  <Button text="{N}" class="background"></Button>
</StackLayout>
```

Créer `src/app/home/home.component.scss`.

```scss
@keyframes bgAnimation {
  from { background-color: red; }
  to { background-color: green; }
}
.background {
  color: white;
  animation-name: bgAnimation;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
```

Dans le décorateur `@Component` de `home.component.ts`, ajouter `styleUrls: ['./home.component.scss']`. Garder la méthode `onDrawerButtonTap()` du modèle.

## 3. Animer l’image sur Browse

Remplacer `src/app/browse/browse.component.html`.

```html
<ActionBar title="Parcourir">
  <ActionItem text="Menu" (tap)="onDrawerButtonTap()" />
</ActionBar>
<StackLayout class="p-4">
  <AbsoluteLayout width="300" height="300">
    <Image #cible src="res://icon" left="110" top="110" width="80" height="80" />
  </AbsoluteLayout>
  <Button text="Animer" [isEnabled]="!animationEnCours" (tap)="animate(cible)"></Button>
  <Label [text]="message"></Label>
</StackLayout>
```

Dans `browse.component.ts`, ajouter `View` à l’import depuis `@nativescript/core` et insérer ces membres dans la classe `BrowseComponent` en gardant la méthode du menu.

```typescript
animationEnCours = false;
message = '';

async animate(view: View): Promise<void> {
  if (this.animationEnCours) return;
  this.animationEnCours = true;
  this.message = '';
  const duration = 300;
  try {
    await view.animate({ opacity: 0, duration });
    await view.animate({ opacity: 1, duration });
    await view.animate({ translate: { x: 65, y: 35 }, duration });
    await view.animate({ translate: { x: 0, y: 0 }, duration });
    await view.animate({ scale: { x: 1.5, y: 1.5 }, duration });
    await view.animate({ scale: { x: 1, y: 1 }, duration });
    await view.animate({ rotate: 180, duration });
    await view.animate({ rotate: 0, duration });
    this.message = 'Animation terminée.';
  } catch {
    this.message = 'Animation interrompue.';
  } finally {
    view.opacity = 1;
    view.translateX = 0;
    view.translateY = 0;
    view.scaleX = 1;
    view.scaleY = 1;
    view.rotate = 0;
    this.animationEnCours = false;
  }
}
```

## 4. Lancer et vérifier

Avec `ns run android`, ouvrir **Home**. Le bouton doit passer du rouge au vert en deux secondes. Dans **Browse**, toucher **Animer**. Vérifier que l’image disparaît et revient, se déplace, change d’échelle, tourne, puis retrouve son état initial. Un deuxième appui doit pouvoir relancer la séquence une fois la première terminée.

## Vérification

Les étapes ci-dessus décrivent le résultat attendu. L’exécution sur Android et les captures restent à vérifier. Le dossier [images](images/) est prévu pour les captures.

[Consignes du cours](../README.md)
