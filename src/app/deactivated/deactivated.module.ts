import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeactivatedRoutingModule } from './deactivated-routing.module';
import { DeactivatedComponent } from './deactivated.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';


@NgModule({
  declarations: [DeactivatedComponent],
  imports: [
    CommonModule,
    DeactivatedRoutingModule,
    MaterialModule,
    CommonsModule
  ]
})
export class DeactivatedModule { }
