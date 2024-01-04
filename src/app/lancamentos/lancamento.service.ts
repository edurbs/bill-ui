import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  lancamentosUrl = 'http://localhost:8080/bills';

  private headers: HttpHeaders = new HttpHeaders().append(
    'Authorization',
    'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
  );

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

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
        headers: this.headers,
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
      .delete<void>(`${this.lancamentosUrl}/${codigo}`, {
        headers: this.headers,
      })
      .toPromise();
  }

  adicionar(lancamento: Bill): Promise<Bill | undefined> {
    return this.http
      .post<Bill>(this.lancamentosUrl, lancamento, {headers: this.headers})
      .toPromise();
  }
}
