import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart, Item } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping-Cart';

  inventoryItems: Item[] = [
    {id:1, name: "apple", unitPrice: 0.65, quantity: 0}, 
    {id:2, name: "carrot", unitPrice: 0.45, quantity: 0},
    {id:3, name: "corn", unitPrice: 1.20, quantity: 0},
    {id:4, name: "onion", unitPrice: 0.30, quantity: 0},
    {id:5, name: "squash", unitPrice: 1.74, quantity: 0},
    {id:6, name: "tomato", unitPrice: 0.38, quantity: 0},
  ]

  cart!: Cart

  addToCart(item: Item) {

    if(this.cart === undefined) {
      this.cart =  {
        id: this.generateId(),
        name: "",
        address: "",
        delivery: "",
        items: [item]
      }
    } else {

      let idx = this.cart.items.findIndex(x => x.name === item.name);
      // console.log(item.name);
      // console.log("idx", idx);
      if (idx === -1) {
        this.cart.items.push(item);
        // console.log("push >>> ", item);
      } else {
        // console.log("add quantity >>> ", item);
        this.cart.items[idx].quantity += item.quantity;
      }
    }
    this.cart = {... this.cart};
  }

  private generateId(): string {
    return Math.random().toString(36).slice(2, 10);
  }

}
