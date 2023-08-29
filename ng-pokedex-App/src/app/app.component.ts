import { Component, OnInit } from "@angular/core";
import { POKEMONS } from "./mock-pokemons";
import { Pokemon } from "./pokemon";

@Component({
  selector: "app-root",
  templateUrl: `app.component.html`,
})
export class AppComponent implements OnInit {
  title: string = "ng-pokedex-App";
  pokemonsList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon | undefined;

  ngOnInit(): void {
    console.table(this.pokemonsList);
  }

  selectPokemon(pokemonId: string): void {
    const Id = +pokemonId;
    const pokemon: Pokemon | undefined = this.pokemonsList.find(
      (pokemon) => pokemon.id === Id
    );

    if (pokemon) {
      console.log(`Vous avez demandé ${pokemon.name}`);
      this.pokemonSelected = pokemon;
    } else {
      console.log("Vous avez demandé un pokémon qui n'existe pas");
    }
  }
}
