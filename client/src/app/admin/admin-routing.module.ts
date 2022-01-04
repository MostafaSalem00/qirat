import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
  {path: '' , component: HomeComponent , data: {breadcrumb: 'Admin'}},
  // {path: 'login' , component: LoginComponent , data: {breadcrumb: 'Login'}},
  {path: 'home' , component: HomeComponent , data: {breadcrumb: 'Home'}},
  {path: 'users', component: UsersComponent , data: {breadcrumb: 'Users'}},
  {path: 'user-details/:id', component: UserDetailsComponent , data: {breadcrumb: 'User Details'}},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
