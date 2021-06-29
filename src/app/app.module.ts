import { UserService } from './user.service';
import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
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
import {MatChipsModule} from '@angular/material/chips';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FooterComponent } from './footer/footer.component';
import { MangageUserComponent } from './User/manage-user/mangage-user.component';
import { ProfileComponent } from './User/profile/profile.component';
import { AlertModule,AlertConfig } from 'ngx-bootstrap/alert';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MangageUserComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
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

  ],
  providers: [UserService,AlertConfig ],
  bootstrap: [AppComponent]
})
export class AppModule { }
