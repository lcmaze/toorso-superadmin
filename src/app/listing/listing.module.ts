import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingRoutingModule } from './listing-routing.module';
import { ListingComponent } from './listing.component';
import { MaterialModule } from '../components/material/material.module';
import { CommonsModule } from '../components/commons/commons.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListingComponent],
  imports: [
    CommonModule,
    ListingRoutingModule,
    MaterialModule,
    CommonsModule,
    FormsModule
  ]
})
export class ListingModule { }
