import { Component, inject } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { EMPTY, catchError } from 'rxjs';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [AsyncPipe, NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',

})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);

  //Vehicles
  vehicles$ = this.vehicleService.vehicles$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  selectedVehicle$ = this.vehicleService.selectedVehicle$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  //when the vehicle is selected, emit the vehicle name
  onSelect(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

}
