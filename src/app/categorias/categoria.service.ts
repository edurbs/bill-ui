import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  categoriasUrl: string;

  constructor(private httpClient: HttpClient) {
    this.categoriasUrl = environment.apiUrl+"/categories";
  }

  listarTodas(): Promise<any> {
    return this.httpClient
        .get<any>(this.categoriasUrl)
        .toPromise();
  }
}
