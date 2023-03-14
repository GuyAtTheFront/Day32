import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, Item } from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges{

  @Input()
  cart!: Cart;

  form!: FormGroup;
  formArray!: FormArray;
  totalPrice!: number;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // clear formArray
    if(this.formArray !== undefined) this.formArray.clear();
    // re-populate formArray
    this.cart?.items.forEach(x => this.addFormItem(x))

    this.totalPrice = this.cart.items.reduce((accumulator, x) => accumulator + (x.quantity*x.unitPrice), 0)
  }

  ngOnInit(): void {
    this.formArray = this.fb.array([]);
    this.form = this.createForm();
  }

  private createForm() : FormGroup {

    let grp = this.fb.group({
      name: this.fb.control<string>("", [ Validators.required ]),
      address: this.fb.control<string>("", [ Validators.required ]),
      delivery: this.fb.control<string>("", [ Validators.required, Validators.pattern("^[p|a]m$") ]),
      items: this.formArray
    })

    return grp;
  }

  addFormItem(item: Item) {
    const grp = this.fb.group({
      item: this.fb.control<string>(item.name, [ Validators.required ]),
      unitPrice: this.fb.control<number>(item.unitPrice, [ Validators.required, Validators.min(0) ]),
      quantity: this.fb.control<number>(item.quantity, [ Validators.required, Validators.min(0) ]),
      totalPrice: this.fb.control<number>(item.unitPrice * item.quantity, [ Validators.required, Validators.min(0) ])
    })

    this.formArray.push(grp);
  }

  processForm() {
    console.log(this.form.value);
    // console.log(this.cart.items.reduce((accumulator, x) => accumulator + (x.quantity*x.unitPrice), 0));
  }
}
