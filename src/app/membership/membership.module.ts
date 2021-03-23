import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipComponent } from './membership.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';
import { InfoComponent } from './info/info.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FeaturesComponent } from './features/features.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromotionsComponent } from './promotions/promotions.component';
import { UploadComponent } from './upload/upload.component';
import { RoomWrapperComponent } from './room-wrapper/room-wrapper.component';


@NgModule({
  declarations: [MembershipComponent, InfoComponent, RoomsComponent, FeaturesComponent, AddVendorComponent, PromotionsComponent, UploadComponent, RoomWrapperComponent],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    MaterialModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MembershipModule { }
