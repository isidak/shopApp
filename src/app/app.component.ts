import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from './cart/cart.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shopApp';
  cartService = inject(CartService);

  cartCount$ = this.cartService.cartItems$.pipe(
    map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
  );
}
