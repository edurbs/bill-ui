import { Component, OnInit, Output } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros: number = 0;

  @Output() filtro = new LancamentoFiltro();

  lancamentos: any[] = [];

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
    //this.pesquisar();
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentoService
      .pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }
}
