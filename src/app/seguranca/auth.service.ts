import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  headers: HttpHeaders = new HttpHeaders()
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    .append('Content-Type', 'application/x-www-form-urlencoded');
  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http
      .post(this.oauthTokenUrl, body, {
        headers: this.headers,
        withCredentials: true,
      })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);
      })
      .catch((response) => {
        if (
          response.status === 400 &&
          response.error.error === 'invalid_grant'
        ) {
          return Promise.reject('Usuário ou senha inválido!');
        }
        return Promise.reject(response);
      });
  }
  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles:any){
    for(const role of roles){
      if(this.temPermissao(role)){
        return true;
      }
    }
    return false;
  }

  obterNovoAccessToken(): Promise<void> {
    const body = 'grant_type=refresh_token';
    return this.http
      .post(this.oauthTokenUrl, body, {
        headers: this.headers,
        withCredentials: true,
      })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);
        return Promise.resolve();
      })
      .catch((response) => {
        return Promise.resolve();
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  limparAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  logout(){
    const tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';
    return this.http.delete(tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(()=>{
        this.limparAccessToken();
      });
  }
}
