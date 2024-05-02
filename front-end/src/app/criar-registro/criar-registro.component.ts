import { Component, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-criar-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criar-registro.component.html',
  styleUrl: './criar-registro.component.css'
})
export class CriarRegistroComponent {
  @Input() nomeSala = '';
  @Input() foto = '';
  @Input() local = '';
  @Input() data_uso = '';
  @Input() hora_inicio = '';
  @Input() hora_final = '';
  @Input() responsavel = '';
  @Input() motivo = '';
  @Input() informacoes = '';
  @Input() convidados = '';


  create(event: Event) {
    event.preventDefault();
    console.log(this.nomeSala);
    console.log(this.foto);
    console.log(this.local);
    console.log(this.data_uso);
    console.log(this.hora_inicio);
    console.log(this.hora_final);
    console.log(this.responsavel);
    console.log(this.motivo);
    console.log(this.informacoes);
    console.log(this.convidados);
  }
}
