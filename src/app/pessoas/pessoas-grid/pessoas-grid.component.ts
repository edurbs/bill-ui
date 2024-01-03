import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PessoaFiltro } from '../pessoa.service';
import { PessoasPesquisaComponent } from '../pessoas-pesquisa/pessoas-pesquisa.component';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent implements OnInit {

  @Input() totalRegistros = 0;
  @Input() filtro: PessoaFiltro = new PessoaFiltro();
  @Input() pessoas: any[] = [];
  constructor(private pessoaPesquisaComponent: PessoasPesquisaComponent) { }

  ngOnInit(): void {
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.pessoaPesquisaComponent.pesquisar(pagina);
  }

}
