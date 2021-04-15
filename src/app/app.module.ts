import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonsModule } from './components/commons/commons.module';
import { MainService } from './services/main.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthInterceptor } from './services/auth-interceptor';
import { FormsModule } from '@angular/forms';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA7sqU0aVxPV29dlVZwt0FAuahbAK85KMo",
  authDomain: "toorso-super.firebaseapp.com",
  projectId: "toorso-super",
  storageBucket: "toorso-super.appspot.com",
  messagingSenderId: "339428480987",
  appId: "1:339428480987:web:2b17d4de024b5940c839fe"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
   MainService,
   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
