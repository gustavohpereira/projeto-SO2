import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-ip-config',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ip-config.component.html',
  styleUrl: './ip-config.component.css'
})
export class IpConfigComponent {
  ipAddress: string = '';

  constructor(private cookieService: CookieService) {}

  saveIpAddress() {
    this.cookieService.set('backendIp', this.ipAddress);
    window.location.href = '/';
  }
}
