import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoaService } from './pessoas/pessoa.service';
import { PessoasModule } from './pessoas/pessoas.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,

    CoreModule,
    LancamentosModule,
    PessoasModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
