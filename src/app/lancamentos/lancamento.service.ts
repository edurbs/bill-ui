import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bill } from '../core/model';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentosUrl: string;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.lancamentosUrl = environment.apiUrl + '/bills';
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('description', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set(
        'fromDueDate',
        this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!
      );
    }

    if (filtro.dataVencimentoFim) {
      params = params.set(
        'toDueDate',
        this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!
      );
    }

    return this.http
      .get(`${this.lancamentosUrl}/?projection`, {
        params: params,
      })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content'];

        const resultado = {
          lancamentos,
          total: response['totalElements'],
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<any> {
    return this.http
      .delete<void>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise();
  }

  adicionar(lancamento: Bill): Promise<Bill | undefined> {
    return this.http
      .post<Bill>(this.lancamentosUrl, lancamento)
      .toPromise();
  }

  atualizar (lancamento: |Bill): Promise<Bill|undefined>{
    return this.http.put<Bill>(`${this.lancamentosUrl}/${lancamento.id}`, lancamento)
    .toPromise()
    .then((response: any)=>{
      this.converterStringsParaDatas([response]);
      return response;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Bill|undefined>{
    return this.http.get<Bill>(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then((response: any)=>{
      this.converterStringsParaDatas([response]);
      return response;
    });
  }

  private converterStringsParaDatas(lancamentos: Bill[]){
    for(const lancamento of lancamentos){
      let offset = new Date().getTimezoneOffset()*60000;
      lancamento.dueDate = new Date(new Date(lancamento.dueDate!).getTime()+offset);
      if(lancamento.payDate){
        lancamento.payDate = new Date(new Date(lancamento.payDate).getTime()+offset);
      }
    }
  }

}
