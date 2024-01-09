import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {

  }

  exibindoNavbar(){
    return this.router.url !== '/login';
  }
}
