import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';


registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, LancamentosModule, PessoasModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
