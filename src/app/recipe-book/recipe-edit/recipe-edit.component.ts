import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  faWindowClose = faWindowClose;
  id: number;
  editMode =  false;
  form: FormGroup;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(),
      imageUrl: new FormControl(),
      description: new FormControl()
    });
    this.subscription = this.route.params
      .subscribe((params) => {
        this.id = +params.id;
        this.editMode = params.id ? true : false;
        this.initForm();
      });
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription =  '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getTargetRecipe(this.id);
      recipeName = recipe.name;
      recipeImageUrl = recipe.imageUrl;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push( new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(
              ingredient.amount, [
                Validators.required,
                //TODO
                // Validators.pattern(/[^.\d]+/g)
              ]
            )
          }));
        }
      }
    }
    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imageUrl: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
  get controls() {
    return ( this.form.get('ingredients') as FormArray).controls;
  }
  onSubmit() {
    const newRecipe = this.form.value;
    if (this.editMode) {
      this.recipeService.updateRecipes(this.id , newRecipe);
    } else {
      this.recipeService.addNewRecipe(newRecipe);
    }
    this.form.reset();
  }

  onAddIngredient() {
    const ingredientsFormArray = this.form.get('ingredients') as FormArray;
    ingredientsFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        //TODO
        Validators.pattern(/[^.\d]+/g)
      ])
    }));
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  onDeleteIngredient(i: number) {
    const ingredientsFormArray = this.form.get('ingredients') as FormArray;
    ingredientsFormArray.removeAt(i);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
