import { Component, OnInit, Output } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent implements OnInit {
  pessoas: any[] = [];
  totalRegistros: number = 0;
  @Output() pessoaFiltro = new PessoaFiltro();
  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    //this.listarTodas();
  }

  pesquisar(pagina: number = 0) {
    this.pessoaFiltro.pagina = pagina;
    this.pessoaService
      .pesquisar(this.pessoaFiltro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  listarTodas() {
    this.pessoaService
      .listarTodas()
      .then((resultado) => (this.pessoas = resultado.pessoas));
  }
}
