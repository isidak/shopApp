import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  combineLatest,
  map,
  scan,
  shareReplay,
} from 'rxjs';
import { Action, CartItem } from './cart';
import { Vehicle } from '../vehicle/vehicle';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Add an item to the cart
  private itemSubject = new Subject<Action<CartItem>>();
  itemAction$ = this.itemSubject.asObservable();

    cartItems$: Observable<CartItem[]> = this.itemAction$.pipe(
    scan(
      (items, itemAction) => this.modifyCart(items, itemAction),
      [] as CartItem[]
    ),
    shareReplay(1)
  );

  // Total up the extended price for each item
  subTotal$ = this.cartItems$.pipe(
    map((items: CartItem[]) =>
      items.reduce(
        (acc, item) =>
          acc + item.quantity * Number(item.vehicle.cost_in_credits),
        0
      )
    )
  );

  // Calculate the delivery fee, which is free if the subtotal is over $100000
  deliveryFee$ = this.subTotal$.pipe(
    map((subTotal) => (subTotal < 100000 ? 999 : 0))
  );

  // Calculate the tax fee, which is 10.75% of the subtotal
  taxFee$ = this.subTotal$.pipe(
    map((subTotal) => Math.round(subTotal * 10.75) / 100)
  );

  // Calculate the total price
  totalPrice$ = combineLatest(
    this.subTotal$,
    this.deliveryFee$,
    this.taxFee$
  ).pipe(
    map(([subTotal, deliveryFee, taxfee]) => subTotal + deliveryFee + taxfee)
  );

  // Add an item to the cart as an Action<CartItem>
  addToCart(vehicle: Vehicle) {
    this.itemSubject.next({
      item: { vehicle, quantity: 1 },
      action: 'add',
    });
  };

  // Update the quantity for an item in the cart
  updateInCart(CartItem: CartItem, quantity: number) {
    this.itemSubject.next({
      item: { vehicle: CartItem.vehicle, quantity },
      action: 'update',
    });
  };

  // Remove an item from the cart
  removeFromCart(CartItem: CartItem) {
    this.itemSubject.next({
      item: { vehicle: CartItem.vehicle, quantity: 0 },
      action: 'delete',
    });
  };


  private modifyCart(
    items: CartItem[],
    operation: Action<CartItem>
  ): CartItem[] {
    switch (operation.action) {
      case 'add': {
        const itemInCart = items.find(
          (item) => item.vehicle.name === operation.item.vehicle.name
        );
        if (itemInCart) {
          itemInCart.quantity += 1;
          return items.map((item) =>
            item.vehicle.name === itemInCart.vehicle.name ? itemInCart : item
          );
        } else {
          return [...items, operation.item];
        }
      }
      case 'update':
        return items.map((item) =>
          item.vehicle.name === operation.item.vehicle.name
            ? operation.item
            : item
        );
      case 'delete':
        return items.filter(
          (item) => item.vehicle.name !== operation.item.vehicle.name
        );
      default:
        return [...items];
    }
  }
}
