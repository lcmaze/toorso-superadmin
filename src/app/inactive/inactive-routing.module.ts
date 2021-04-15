import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InactiveComponent } from './inactive.component';

const routes: Routes = [{ path: '', component: InactiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InactiveRoutingModule { }
