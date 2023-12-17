import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent implements OnInit {
  nome = "teste";
  dataAniversario = new Date(1990, 3, 19);
  preco = 12855.32;
  troco = 0.57392;
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
