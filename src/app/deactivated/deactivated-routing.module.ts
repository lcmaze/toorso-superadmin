import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeactivatedComponent } from './deactivated.component';

const routes: Routes = [{ path: '', component: DeactivatedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeactivatedRoutingModule { }
