import { Component, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/core/model';
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

  atualizarStatus(pessoa: any): Promise<any> {
    return this.pessoaService.atualizarStatus(pessoa);
  }

  atualizarPessoa(pessoa: Person): Promise<Person|undefined>{
    return this.pessoaService.atualizarPessoa(pessoa);
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

  excluir(pessoa: any): Promise<any> {
    return this.pessoaService.excluir(pessoa);
  }
}
