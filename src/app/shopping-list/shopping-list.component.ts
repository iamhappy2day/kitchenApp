import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from './shopping.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @Input() ingredient: Ingredient;
  ingredients: Ingredient[];
  private actualIngredientsSubscription: Subscription;
  constructor( private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();

    this.actualIngredientsSubscription = this.shoppingService.actualIngredients
      .subscribe(
        (ingredients) => {
          this.ingredients = ingredients;
      });
  }

  ngOnDestroy() {
    this.actualIngredientsSubscription.unsubscribe();
  }


}
