import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../cart';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, FormsModule, NgFor, NgIf],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  cartService = inject(CartService);
  _item!: CartItem;

  @Input() set item(item: CartItem) {
    this._item = item;
    this.itemChangedSubject.next(item);
  }

  get item(): CartItem {
    return this._item;
  }

  // Hard-coded quantity
  // These should come from an inventory service
  qtyArr = [1, 2, 3, 4, 5, 6, 7, 8];

  // Item was changed action
  private itemChangedSubject = new BehaviorSubject<CartItem>(this.item);
  item$ = this.itemChangedSubject.asObservable();

  // When the item changes, recalculate the extended price
  extPrice$ = this.item$.pipe(
    map((item) => item.quantity * Number(item.vehicle.cost_in_credits))
  );

  onQuantitySelected(quantity: number) {
    this.cartService.updateInCart(this.item, Number(quantity));
  }

  onRemove() {
    this.cartService.removeFromCart(this.item);
  }
}
