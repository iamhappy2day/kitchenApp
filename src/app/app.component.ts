import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kitchenApp';
  displayRecipes = true;

  onHeaderClick(link: string) {
    if (link === 'recipes') {
      console.log('nav to recipes');
      this.displayRecipes = true;

    } else if (link === 'shoppingList') {
      console.log( 'nav to shoppingList');
      this.displayRecipes = false;
    }
  }
}
