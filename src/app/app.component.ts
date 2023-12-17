import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  profissoes = ['Programador', 'Empresário', 'Outra'];

  salvar(usuarioForm: NgForm) {
    console.log(usuarioForm.value);
  }
}
