import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRoutingModule } from './pending-routing.module';
import { PendingComponent } from './pending.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';


@NgModule({
  declarations: [PendingComponent],
  imports: [
    CommonModule,
    PendingRoutingModule,
    CommonsModule,
    MaterialModule
  ]
})
export class PendingModule { }
