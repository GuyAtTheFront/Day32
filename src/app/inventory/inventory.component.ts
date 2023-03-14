import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  addedItem = new Subject<Item>();;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {};

  ngOnInit(): void {
    this.form = this.createForm();
    this.form.get("item")?.disable();
    this.form.get("unitPrice")?.disable();
  }

  private createForm() {
    return this.form = this.fb.group({
      item: this.fb.control<string>(""),
      unitPrice: this.fb.control<string>(""),
      quantity: this.fb.control<number>(0)
    })
  }

  onSelectItem(idx: number) {
    this.setFormValues(this.items[idx]);
  }

  processForm() {
    // returns only quantity because fields disabled
    // console.log(this.form.getRawValue())
    this.addedItem.next(<Item> this.form.getRawValue());
  }

  private setFormValues(item: Item) {
    this.form.setValue({
      item: item.name,
      unitPrice: item.unitPrice,
      quantity: 0
    })
  }

}
