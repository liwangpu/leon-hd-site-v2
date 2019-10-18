import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { APISERVER } from "app-common";
@Injectable()
export class TokenService {

    private get _apiServer() {
        return `${this.apiServer}/Basic/Tokens`;
    }

    constructor(
        @Inject(APISERVER) private apiServer: string,
        private httpClient: HttpClient
    ) {
        // console.log("TokenService APISERVERTOKEN", this.apiServer.toString());
    }//constructor

    login(userName: string, password: string) {
        let data = {
            username: userName,
            password: Md5.hashStr(password).toString()
        };
        return this.httpClient.post<{ token: string, expires: string }>(`${this._apiServer}`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    }//login
}
