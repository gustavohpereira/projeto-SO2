import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
  imports: [FormsModule],
})
export class AddReservationComponent {
  formData: any = {}; // Objeto para armazenar os dados do formulário

  constructor(private http: HttpClient) {}

  submitForm(event: Event): void {
    console.log('Adicionando nova reserva...',this.formData);
    event.preventDefault();
    this.http.post<any>(
      `${environment.apiUrl}reservation/create`, 
      this.formData, 
      { observe: 'response' }
    ).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.log('Reserva criada com sucesso:', response.body);
          alert('Reserva criada com sucesso');
          // Redirecionar ou realizar outra ação após criar a reserva
        } else {
          console.error('Erro inesperado:', response.status);
          alert('Erro inesperado ao criar a reserva');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao criar reserva:', error);
        alert('Erro ao criar reserva');
      },
      complete: () => {
        console.info('Requisição de criação de reserva completa');
      }
    });
  }
}