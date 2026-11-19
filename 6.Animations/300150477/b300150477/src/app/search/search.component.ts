import { Component } from "@angular/core";
import { Application, TextField } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: "Search",
  standalone: false,
  templateUrl: "./search.component.html"
})
export class SearchComponent {
  private readonly destinations = [
    { nom: "🇩🇿 Djurdjura", region: "Kabylie, Algérie" },
    { nom: "🇨🇦 Rocheuses canadiennes", region: "Alberta et Colombie-Britannique, Canada" }
  ];

  resultats = this.destinations;

  onRechercheChange(champ: TextField): void {
    const recherche = this.normaliser(champ.text ?? "").trim();

    this.resultats = this.destinations.filter(({ nom, region }) =>
      this.normaliser(`${nom} ${region}`).includes(recherche)
    );
  }

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer;
    sideDrawer.showDrawer();
  }

private normaliser(texte: string): string {
  return texte.toLowerCase()
    .replace(/[àâä]/g, "a")
    .replace(/[éèêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o")
    .replace(/[ùûü]/g, "u")
    .replace(/ç/g, "c")
    .replace(/[\u0300-\u036f]/g, "");
}
}