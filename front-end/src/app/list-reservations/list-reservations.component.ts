import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms'; 

@Component({
  standalone: true,
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css'],
  imports: [FormsModule],
  
})
export class ListReservationsComponent implements OnInit {
  reservations: any[] = [];
  filteredReservations: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.http.get<any[]>(`${environment.apiUrl}reservation/getAll`).subscribe({
      next: (data: any[]) => {
        this.reservations = data;
        this.sortReservationsByDate(); // Ordenar as reservas por data
        this.filteredReservations = [...this.reservations]; // Copiar as reservas para a lista filtrada
        console.log('Reservas obtidas com sucesso:', this.reservations);
      },
      error: (error) => {
        console.error('Erro ao obter reservas:', error);
      },
    });
  }

  sortReservationsByDate(): void {
    this.reservations.sort((a, b) => new Date(a.dateOfUse).getTime() - new Date(b.dateOfUse).getTime());
  }

  addReservation() {
    console.log('Adicionando nova reserva...');
    window.location.href = '/create-reservation';
  }

  removeReservation(id: number) {
    console.log('Removendo reserva...', id);
    const confirmed = window.confirm('Tem certeza que deseja remover esta reserva?');
    if (!confirmed) {
      return;
    }
    this.http
      .delete<any>(`${environment.apiUrl}reservation/delete/${id}`)
      .subscribe({
        next: (data) => {
          console.log('Reserva removida com sucesso:', data);
          this.fetchReservations();
        },
        error: (error) => {
          console.error('Erro ao remover reserva:', error);
        },
      });
  }

  searchReservations(): void {
    console.log('Pesquisando reservas...', this.searchQuery);
    if (!this.searchQuery) {
      this.filteredReservations = [...this.reservations]; 
      return;
    }
    this.filteredReservations = this.reservations.filter(reservation =>
      reservation.roomName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    console.log('Reservas filtradas:', this.filteredReservations);
  }
}