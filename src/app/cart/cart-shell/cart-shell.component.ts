import { Component } from '@angular/core';
import { CartListComponent } from '../cart-list/cart-list.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';

@Component({
  selector: 'app-cart-shell',
  standalone: true,
  imports: [CartListComponent, CartTotalComponent],
  template: `
  <div class='row'>
    <div class='col-md-6'>
        <app-cart-list></app-cart-list>
    </div>
    <div class='col-md-6'>
        <app-cart-total></app-cart-total>
    </div>
  </div>
  `,
  styleUrl: './cart-shell.component.scss'
})
export class CartShellComponent {

}
