import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { PessoaFiltro } from '../pessoa.service';
import { PessoasPesquisaComponent } from '../pessoas-pesquisa/pessoas-pesquisa.component';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css'],
})
export class PessoasGridComponent implements OnInit {
  @Input() totalRegistros = 0;
  @Input() filtro: PessoaFiltro = new PessoaFiltro();
  @Input() pessoas: any[] = [];
  @ViewChild('pessoasTable') grid!: any;
  constructor(private pessoaPesquisaComponent: PessoasPesquisaComponent,
    private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {}

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pessoaPesquisaComponent.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      },
    })
  }

  excluir(pessoa: any) {
    this.pessoaPesquisaComponent.excluir(pessoa).then(() => {
      this.grid.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Pessoa excluída com sucesso',
      })
    }).catch((erro) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao excluir pessoa: ' + erro.error[0].userMessage,
      })
    });
  }
}
