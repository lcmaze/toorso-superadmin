import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipComponent } from './membership.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [MembershipComponent, InfoComponent],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    MaterialModule,
    CommonsModule
  ]
})
export class MembershipModule { }
