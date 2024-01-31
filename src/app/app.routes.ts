import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { CartShellComponent } from './cart/cart-shell/cart-shell.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { VehicleService } from './vehicle/vehicle.service';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./vehicle/vehicle-shell/vehicle-shell.component').then(m => m.VehicleShellComponent)
      },
      {
        path: 'cart',
        component: CartShellComponent
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
];
