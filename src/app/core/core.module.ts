import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { AuthService } from '../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule


  ],
  exports: [NavbarComponent, ToastModule, ConfirmDialogModule],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    Title,
    JwtHelperService,

    AuthService,
    LancamentoService,
    PessoaService,
  ],
})
export class CoreModule {}
