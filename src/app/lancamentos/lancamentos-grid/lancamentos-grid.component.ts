import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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

  @ViewChild('lancamentosTable', { static: true }) grid: any;

  constructor(
    private lancamentosPesquisaComponent: LancamentosPesquisaComponent,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }
    this.lancamentosPesquisaComponent.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      },
    })
  }

  excluir(lancamento: any) {
    this.lancamentosPesquisaComponent.excluir(lancamento).then(() => {
      this.grid.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Lançamento excluído com sucesso',
      })
    });
  }
}
