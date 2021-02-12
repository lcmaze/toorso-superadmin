import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'listing', loadChildren: () => import('./listing/listing.module').then(m => m.ListingModule) },
  { path: 'membership', loadChildren: () => import('./membership/membership.module').then(m => m.MembershipModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
