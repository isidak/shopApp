import { AsyncPipe, NgFor, NgIf, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { VehicleService } from '../vehicle.service';
import { EMPTY, catchError, map } from 'rxjs';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, DecimalPipe],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss',
})
export class VehicleDetailComponent {
  errorMessage = '';
  cartService = inject(CartService);
  vehicleService = inject(VehicleService);

  //Vehicles
  vehicle$ = this.vehicleService.selectedVehicle$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  pageTitle$ = this.vehicle$.pipe(
    map((vehicle) => {
      vehicle ? `Details for ${vehicle.name}` : '';
    })
  );

  vehicleFilms$ = this.vehicleService.vehicleFilms$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  addToCart(vehicle: Vehicle) {
    this.cartService.addToCart(vehicle);
  }
}
