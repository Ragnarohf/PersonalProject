import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <h1>Bienvenue dans mon application Angular {{ title }}!</h1> `,
})
export class AppComponent {
  title: string = "ng-pokedex-App";
}
