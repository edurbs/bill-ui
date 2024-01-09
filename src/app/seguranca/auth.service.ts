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
      console.log(response);
      this.armazenarToken(response['access_token']);
      console.log(this.jwtPayload);
    }).catch(response => {
      console.log(response);
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
