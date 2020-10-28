import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { environment } from 'src/environments/environment';
import { BookingsComponent } from './components/bookings/bookings.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { AuthService } from './services/auth-service/auth.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { ConfirmDialogComponent } from './components/share/confirm-dialog/confirm-dialog.component';

export function loadConfigurations(localStorageService: LocalStorageService) {
  return () => localStorageService.storeAllBooking();
}

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    BookingsComponent,
    BookingDetailsComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [AuthService,
    LocalStorageService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurations,
      deps: [LocalStorageService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
