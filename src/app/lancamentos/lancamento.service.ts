import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  pesquisar(): Promise<any> {
    return this.http
      .get(`${this.lancamentosUrl}/?projection`, { headers: this.headers })
      .toPromise()
      .then((response: any) => response['content']);
  }
}
