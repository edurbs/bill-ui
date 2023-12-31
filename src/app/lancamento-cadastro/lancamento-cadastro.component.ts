import { Component, OnInit } from '@angular/core';

interface Tipo {
  label: string;
  value: string;
}

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
})

export default class LancamentoCadastroComponent implements OnInit {
  tipos: Tipo[];

  constructor() {
    this.tipos = [
      {label: 'Receita', value:'RECEITA'},
      {label: 'Despesa', value:'DESPESA'}
    ]
  }

  ngOnInit(): void {}
}
