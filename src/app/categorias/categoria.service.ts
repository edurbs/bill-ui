import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  url: string = 'http://localhost:8080/categories';
  headers: HttpHeaders = new HttpHeaders().append(
    'Authorization',
    'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
  );

  constructor(private httpClient: HttpClient) {}

  listarTodas(): Promise<any> {
    return this.httpClient
        .get<any>(this.url, { headers: this.headers })
        .toPromise();
  }
}
