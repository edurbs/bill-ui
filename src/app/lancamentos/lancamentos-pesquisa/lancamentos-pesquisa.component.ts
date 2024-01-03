import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos: any[] = [];
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(): void {
    const filtro: LancamentoFiltro = {
      description: this.descricao,
      fromDueDate: this.dataVencimentoInicio,
      toDueDate: this.dataVencimentoFim
    }
    this.lancamentoService
      .pesquisar(filtro)
      .then((lancamentos) => (this.lancamentos = lancamentos));
  }
}
