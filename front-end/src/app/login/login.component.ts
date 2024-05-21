import { Component, Input, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BackEndConnectionService } from '../back-end-connection.service';
import { HttpClient,HttpHandler } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() username: string = '';
  @Input()  password: string = '';


  http = inject(HttpClient);

  login(event: Event) {
    event.preventDefault();
    this.http.get('http://18.215.169.99:3000/user/getAll').subscribe((data)=>{console.log(data)}) 
  }
}
