import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import { Md5 } from 'ts-md5';

@Injectable()
export class TokenService {

  private get _URI() {
    return `${this.appConfiSrv.APIServer}/Basic/Tokens`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {
  }//constructor

  login(userName: string, password: string) {
    let data = {
      username: userName,
      password: Md5.hashStr(password).toString()
    };
    return this.httpClient.post<{ token: string, expires: string }>(`${this._URI}`, data, { headers: this._header });
  }//login

}
