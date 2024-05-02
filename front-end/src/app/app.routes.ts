import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { CriarRegistroComponent } from './criar-registro/criar-registro.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'criar-registro', component: CriarRegistroComponent },
  { path: 'list-reservations', component: ListReservationsComponent },
];
