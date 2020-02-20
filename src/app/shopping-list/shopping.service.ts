import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('cucumber', 3),
    new Ingredient('tomatoes', 6),
  ];

  actualIngredients = new Subject<Ingredient[]>();
  choosenIngredient = new Subject<Ingredient>();
  choosenIngredientIndex: number;

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  onAddIngredients(ingredients) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ingredients.length; i++) {
      const ingredientForAdd = new Ingredient(ingredients[i].name , ingredients[i].amount );
      this.ingredients.push(ingredientForAdd);
    }

    this.actualIngredients.next(this.ingredients);
  }

  onAddIngredient(ingredientName: string, ingredientAmount: number) {
    const ingredientForAdd = new Ingredient(ingredientName, ingredientAmount);
    this.ingredients.push(ingredientForAdd);
    this.actualIngredients.next(this.ingredients);
  }

  getTargetIngredient(i: number) {
    this.choosenIngredientIndex = i;
    this.choosenIngredient.next(this.ingredients[i]);
  }

  onEditIngredient(index, ingredientName: string, ingredientAmount: number ) {
    const newIngredient =  new Ingredient(ingredientName, ingredientAmount)
    this.ingredients[index] = newIngredient;
    this.actualIngredients.next(this.ingredients);
  }

  onDeleteIngredient() {
    this.ingredients.splice(this.choosenIngredientIndex, 1);
    this.actualIngredients.next(this.ingredients);
  }
}
