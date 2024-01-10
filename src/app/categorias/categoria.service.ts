import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  url: string = 'http://localhost:8080/categories';

  constructor(private httpClient: HttpClient) {}

  listarTodas(): Promise<any> {
    return this.httpClient
        .get<any>(this.url)
        .toPromise();
  }
}
