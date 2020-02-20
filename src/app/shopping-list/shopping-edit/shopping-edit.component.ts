import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  form: FormGroup;
  name: string;
  amount: number;
  subscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;
  formUntouched: boolean;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(),
      amount: new FormControl()
    });

    this.subscription = this.shoppingService.choosenIngredient
      .subscribe((editedIngredient) => {
        this.editMode = true;
        this.editedIngredient = editedIngredient;
        this.form.setValue({
          name: editedIngredient.name,
          amount: editedIngredient.amount
        });
      });
  }

  onAddIngredient() {
    const ingredientName = this.form.value.name;
    const ingredientAmount = this.form.value.amount;

    if (this.editMode) {
      this.shoppingService.onEditIngredient(
        this.shoppingService.choosenIngredientIndex, ingredientName, ingredientAmount
      );
      this.editMode = !this.editMode;
      this.form.reset();
    } else {
      this.shoppingService.onAddIngredient(ingredientName, ingredientAmount);
      this.form.reset();
      this.formUntouched = false;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClearForm() {
    this.form.reset();
  }

  onDeleteIngredient() {
    this.shoppingService.onDeleteIngredient();
    this.editMode = !this.editMode
    this.form.reset();
  }
}
