import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item } from '../models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @Input()
  items: Item[] = [];

  @Output()
  onAddItem = new Subject<Item>();;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {};

  ngOnInit(): void {
    this.form = this.createForm();
    // this.form.get("name")?.disable();
    // this.form.get("unitPrice")?.disable();
  }

  private createForm() {
    return this.form = this.fb.group({
      name: this.fb.control<string>("", [ Validators.required ]),
      unitPrice: this.fb.control<string>("", [ Validators.required, Validators.min(0) ]),
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1), Validators.max(10) ])
    })
  }

  onSelectItem(idx: number) {
    this.setFormValues(this.items[idx]);
  }

  processForm() {
    // returns only quantity because fields disabled
    // console.log(this.form.getRawValue())
    this.onAddItem.next(<Item> this.form.getRawValue());
  }

  private setFormValues(item: Item) {
    this.form.setValue({
      name: item.name,
      unitPrice: item.unitPrice,
      quantity: 1
    })
  }

}
