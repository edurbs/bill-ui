import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

class Cliente {
  nome!: string;
  email!: string;
  profissao!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  cliente = new Cliente();

  profissoes = ['Programador', 'Empresário', 'Outra'];
  profissaoPadrao = "Outra";

  salvar(usuarioForm: NgForm) {

    this.cliente = new Cliente();
    usuarioForm.reset({profissao: ''});

    console.log(usuarioForm.value);
    console.log(this.cliente);

  }
}
