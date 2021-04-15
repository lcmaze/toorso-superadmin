import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipComponent } from './membership.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';
import { InfoComponent } from './info/info.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FeaturesComponent } from './features/features.component';
import { BookingComponent } from './booking/booking.component';
import { GuestComponent } from './guest/guest.component';


@NgModule({
  declarations: [MembershipComponent, InfoComponent, RoomsComponent, FeaturesComponent, BookingComponent, GuestComponent],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    MaterialModule,
    CommonsModule
  ]
})
export class MembershipModule { }
