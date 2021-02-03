import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'booking', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) },
  { path: 'listing', loadChildren: () => import('./listing/listing.module').then(m => m.ListingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
