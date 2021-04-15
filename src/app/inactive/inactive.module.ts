import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InactiveRoutingModule } from './inactive-routing.module';
import { InactiveComponent } from './inactive.component';
import { CommonsModule } from '../components/commons/commons.module';
import { MaterialModule } from '../components/material/material.module';


@NgModule({
  declarations: [InactiveComponent],
  imports: [
    CommonModule,
    InactiveRoutingModule,
    MaterialModule,
    CommonsModule
  ]
})
export class InactiveModule { }
