import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LancamentoFiltro } from '../lancamento.service';
import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css'],
})
export class LancamentosGridComponent implements OnInit {
  @Input() lancamentos: any[] = [];
  @Input() totalRegistros: number = 0;
  @Input() filtro: LancamentoFiltro = new LancamentoFiltro();

  constructor(
    private lancamentosPesquisaComponent: LancamentosPesquisaComponent
  ) {}

  ngOnInit(): void {}

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }
    this.lancamentosPesquisaComponent.pesquisar(pagina);
  }
}
