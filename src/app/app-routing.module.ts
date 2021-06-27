import { ProfileComponent } from './User/profile/profile.component';
import { MangageUserComponent } from './User/manage-user/mangage-user.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user-profile/:id', component: ProfileComponent},
  {path: 'manage-user', component: MangageUserComponent},
  {path:'**', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
