import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {AddReservationComponent} from './add-reservation/add-reservation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,AddReservationComponent,ListReservationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';

}
