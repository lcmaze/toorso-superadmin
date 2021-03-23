import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { HeadTitleComponent } from './head-title/head-title.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { LoginComponent } from './login/login.component';
import { CityFilterComponent } from './city-filter/city-filter.component';
import { VendorSearchComponent } from './vendor-search/vendor-search.component';
import { CategorySelectComponent } from './category-select/category-select.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HeadTitleComponent,
    DateRangeComponent,
    LoginComponent,
    CityFilterComponent,
    VendorSearchComponent,
    CategorySelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HeadTitleComponent,
    DateRangeComponent,
    LoginComponent,
    CityFilterComponent,
    VendorSearchComponent,
    CategorySelectComponent
  ]
})
export class CommonsModule { }
