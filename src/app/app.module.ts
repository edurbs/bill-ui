import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoaService } from './pessoas/pessoa.service';
import { PessoasModule } from './pessoas/pessoas.module';

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
  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
