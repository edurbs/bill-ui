import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) {
      this.carregarToken();
      console.log(this.jwtPayload);
     }

  login (usuario: string, senha: string): Promise<void>{
    const headers: HttpHeaders = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post(this.oauthTokenUrl, body, {headers: headers})
    .toPromise()
    .then((response: any) => {
      this.armazenarToken(response['access_token']);
    }).catch(response => {
      if(response.status === 400 && response.error.error === 'invalid_grant'){
        return Promise.reject('Usuário ou senha inválido!');
      }
      return Promise.reject(response);
    } );
  }
  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregarToken(){
    const token = localStorage.getItem('token');
    if(token){
      this.armazenarToken(token);
    }
  }
}
