import { UserService } from './user.service';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG,} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DATE_LOCALE, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {SwiperModule} from 'ngx-swiper-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FooterComponent } from './footer/footer.component';
import { MangageUserComponent } from './User/mangage-user/mangage-user.component';
import { ProfileComponent } from './User/profile/profile.component';
import { AlertModule,AlertConfig } from 'ngx-bootstrap/alert';
import 'hammerjs';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MangageUserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
    SwiperModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSliderModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    AlertModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [MangageUserComponent],
  providers: [
    {provide: ErrorStateMatcher, useClass:ShowOnDirtyErrorStateMatcher},UserService,AlertConfig ],
  bootstrap: [AppComponent]
})
export class AppModule { }
