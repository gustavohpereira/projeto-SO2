import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input() username: string = '';
  @Input() password: string = '';

  http = inject(HttpClient);

  login(event: Event) {
    event.preventDefault();
    this.http.post<any>(
      `${environment.apiUrl}user/login`, 
      { nome: this.username, senha: this.password }, 
      { observe: 'response' }
    ).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.log('Login efetuado com sucesso:', response.body.message);
          alert('Login efetuado com sucesso');
          window.location.href = '/list-reservations';
        } else {
          console.error('Erro inesperado:', response.status);
          alert('Erro inesperado durante o login');
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert('Usuário ou senha inválidos');
        } else {
          console.error('Erro ao fazer login:', error);
          alert('Erro inesperado ao fazer login');
        }
      },
      complete: () => {
        console.info('Requisição de login completa');
      }
    });
  }
}
