import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import {AddReservationComponent} from './add-reservation/add-reservation.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-reservation', component: AddReservationComponent },
  { path: 'list-reservations', component: ListReservationsComponent },
];
