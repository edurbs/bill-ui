import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';


registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    LancamentosModule,
    PessoasModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
