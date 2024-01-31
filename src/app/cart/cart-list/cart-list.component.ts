import { AsyncPipe, NgFor } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from './../cart.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [AsyncPipe, NgFor, CartItemComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  cartService = inject(CartService);
  cartItems$ = this.cartService.cartItems$;

}
