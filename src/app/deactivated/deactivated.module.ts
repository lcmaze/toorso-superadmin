import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeactivatedRoutingModule } from './deactivated-routing.module';
import { DeactivatedComponent } from './deactivated.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DeactivatedComponent],
  imports: [
    CommonModule,
    DeactivatedRoutingModule,
    MaterialModule,
    CommonsModule,
    FormsModule
  ]
})
export class DeactivatedModule { }
