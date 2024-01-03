import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome?: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  headers: HttpHeaders = new HttpHeaders().append(
    'Authorization',
    'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
  );

  pessoasUrl = 'http://localhost:8080/persons';

  constructor(private httpClient: HttpClient) {}

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

      if(filtro.nome) {
        params = params.set('name', filtro.nome);
      }

      return this.httpClient
        .get(this.pessoasUrl, {
          headers: this.headers,
          params,
        })
        .toPromise()
        .then((response: any) => {
          const pessoas = response['content'];

          const resultado = {
            pessoas,
            total: response['totalElements'],
          };
          return resultado;
        })
  }

  listarTodas(): Promise<any> {
    return this.httpClient.get(this.pessoasUrl, {
      headers: this.headers,
    })
    .toPromise()
    .then((response: any) =>  response['content']);
  }
}
