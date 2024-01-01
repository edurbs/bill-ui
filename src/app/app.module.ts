import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { MessageComponent } from './message/message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasModule } from './pessoas/pessoas.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageComponent,
  ],
  imports: [
    LancamentosModule,
    PessoasModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
