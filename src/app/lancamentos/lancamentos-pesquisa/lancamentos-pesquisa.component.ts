import { Component, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
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

  constructor(
    private lancamentoService: LancamentoService,
    private primengConfig: PrimeNGConfig
    ) {}

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      accept: 'Aceitar',
      reject: 'Cancelar',
      dayNames: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      today: 'Hoje',
      weekHeader: 'Sem',
    });
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro).then((resultado) => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    });
  }

  excluir(lancamento: any): Promise<any> {
    return this.lancamentoService.excluir(lancamento.id);
  }
}
