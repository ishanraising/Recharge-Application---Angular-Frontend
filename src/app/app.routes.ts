import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path : 'login' , component :LoginComponent},
    {path : 'register' , component :RegisterComponent},
    {path : 'recharge' , component :RechargeComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
    
];
// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
//   })
  
