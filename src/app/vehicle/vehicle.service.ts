import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Film, Vehicle, VehicleResponse } from './vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  http = inject(HttpClient);
  private url = 'https://swapi.py4e.com/api/vehicles';

  //Action stream
  private vehicleSelectedSubject = new BehaviorSubject<string>('');
  vehicleSelected$ = this.vehicleSelectedSubject.asObservable();

  //First page of vehicles
  vehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    map((data) =>
      data.results.map(
        (vehicle) =>
          ({
            ...vehicle,
            cost_in_credits: isNaN(Number(vehicle.cost_in_credits))
              ? String(Math.random() * 100000)
              : Number(vehicle.cost_in_credits),
          } as Vehicle)
      )
    ),
    shareReplay(1),
    catchError(this.handleError)
  );

  // Find the vehicle in the list of vehicles
  selectedVehicle$ = combineLatest([
    this.vehicles$,
    this.vehicleSelected$,
  ]).pipe(
    map(([vehicles, vehicleName]) =>
      vehicles.find((vehicle) => vehicle.name === vehicleName)
    ),
    shareReplay(1)
  );

  vehicleFilms$ = this.selectedVehicle$.pipe(
    filter(Boolean),
    switchMap((vehicle) =>
      forkJoin(vehicle.films.map((film) => this.http.get<Film>(film)))
    )
  );

  vehicleSelected(vehicleName: string) {
    this.vehicleSelectedSubject.next(vehicleName);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // send the server to remote logging infrastructure
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
