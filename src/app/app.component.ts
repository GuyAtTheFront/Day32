import { Component } from '@angular/core';
import { Item } from './models';

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
}
