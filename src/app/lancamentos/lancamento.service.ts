import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LancamentoFiltro {
  description: string;
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

  constructor(private http: HttpClient) {}

  pesquisar( filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();

    if (filtro.description) {
      params = params.set('description', filtro.description);
    }

    return this.http
      .get(`${this.lancamentosUrl}/?projection`, { headers: this.headers, params: params })
      .toPromise()
      .then((response: any) => response['content']);
  }
}
