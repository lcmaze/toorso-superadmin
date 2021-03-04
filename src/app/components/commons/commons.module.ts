import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { HeadTitleComponent } from './head-title/head-title.component';
import { DateRangeComponent } from './date-range/date-range.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HeadTitleComponent,
    DateRangeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HeadTitleComponent,
    DateRangeComponent,
  ]
})
export class CommonsModule { }