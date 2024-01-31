import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
import { CartService } from './../cart.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [ AsyncPipe, DecimalPipe, NgIf],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss'
})
export class CartTotalComponent {
cartService = inject(CartService);

cartItems$ = this.cartService.cartItems$;

subTotal$ = this.cartService.subTotal$;

deliveryFees$ = this.cartService.deliveryFee$;

tax$ = this.cartService.taxFee$;

totalPrice$ = this.cartService.totalPrice$;

}
