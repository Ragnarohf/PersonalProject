import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<h1>Bienvenue dans mon Pokedex Angular {{ pokemons[0] }} !</h1>`,
})
export class AppComponent implements OnInit {
  title: string = "ng-pokedex-App";
  pokemons = ["Bulbizarre", "Salaméche", "Carapuce"];

  ngOnInit(): void {
    console.table(this.pokemons);
  }
}
