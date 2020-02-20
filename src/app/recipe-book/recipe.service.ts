import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Buckwheat with mushrooms',
      'Buckwheat with mushrooms. Cheap and easy to cook',
      'https://whereismyspoon.co/wp-content/uploads/2018/01/kasha-3.jpg',
      [
        new Ingredient('buckwheat', 0.3),
        new Ingredient('mushrooms', 0.1)
      ]),
    new Recipe('Omelet with cheese', "Omelet with cheese. And don't forget about vegetables",
      'https://www.thekidscookmonday.org/wp-content/uploads/2018/12/herb-and-cheese-omelet.jpg',
    [
      new Ingredient('Egg', 4),
      new Ingredient('Cheese', 0.2)
    ])
  ];

  selectedRecipe = new Subject<Recipe>();
  updatedRecipeList = new Subject();

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }

  getTargetRecipe(index: number) {
    return this.recipes[index];
  }

  updateRecipes(index: number, newRecipe: Recipe) {
    const recipes = this.getRecipes();
    recipes[index] = newRecipe;
    this.updatedRecipeList.next(recipes);
  }

  addNewRecipe(newRecipe: Recipe) {
    const recipes = this.getRecipes();
    recipes.push(newRecipe);
    this.updatedRecipeList.next(recipes);
  }

  onDeleteRecepie(id: number) {
    this.recipes.splice(id, 1);
    this.updatedRecipeList.next(this.recipes);
  }
}
