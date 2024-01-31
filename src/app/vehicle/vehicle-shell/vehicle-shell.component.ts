import { CartListComponent } from './../../cart/cart-list/cart-list.component';
import { Component } from '@angular/core';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';

@Component({
  selector: 'app-vehicle-shell',
  standalone: true,
  template: ` <div class="row">
    <div class="col-md-4">
      <app-vehicle-list />
    </div>
    <div class="col-md-8">
      <app-vehicle-detail />
    </div>
  </div>`,
  imports: [VehicleListComponent, VehicleDetailComponent],
})
export class VehicleShellComponent {}
