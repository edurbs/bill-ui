import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent implements OnInit {
  corDoCampo = "green";
  pessoas = [
    {
      nome: 'Manoel Pinheiro',
      cidade: 'Uberlância',
      estado: 'MG',
      ativo: true,
    },
    {
      nome: 'Sebastião da Silva',
      cidade: 'São Paulo',
      estado: 'SP',
      ativo: false,
    },
    {
      nome: 'Carla Souza',
      cidade: 'Florianópolis',
      estado: 'SC',
      ativo: true,
    },
    {
      nome: 'Luís Pereira',
      cidade: 'Curitiba',
      estado: 'PR',
      ativo: false,
    },
    {
      nome: 'Vilmar Andrade',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      ativo: false,
    },
    {
      nome: 'Eduardo Soares',
      cidade: 'Camaducaia',
      estado: 'MG',
      ativo: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
