import { Injectable } from '@angular/core';
import * as queryString from 'query-string';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/account';
import { AccountProfile } from '../models/account-profile';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppConfigService } from '@app/core';
import { PatchOperation } from '@app/feature/base-ms';

@Injectable()
export class AccountService {

  protected _profile: AccountProfile;
  protected _accessPointKeys: string[];
  private get _URI() {
    return `${this.appConfiSrv.APIServer}/Basic/Accounts`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {

  }//constructor

  getById(id: string) {
    return this.httpClient.get<Account>(`${this._URI}/${id}`);
  }//get

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Account[] }>(`${this._URI}?${queryPart}`);
  }//query

  getProfile() {
    if (this._profile)
      return of(this._profile);

    return this.httpClient.get<AccountProfile>(`${this._URI}/Profile`).pipe(tap(x => this._profile = x));
  }//getProfile

  getAccessPointKey() {
    if (this._accessPointKeys)
      return of(this._accessPointKeys);
    return this.httpClient.get<{ keys: string[] }>(`${this._URI}/AccessPointKey`).pipe(map(x=>x.keys)).pipe(tap(ks => this._accessPointKeys = ks));
  }//getAccessPointKey

  post(entity: Account) {
    return this.httpClient.post<Account>(this._URI, entity, { headers: this._header });
  }

  patch(id: string, opts: PatchOperation[]) {
    return this.httpClient.patch(`${this._URI}/${id}`, opts, { headers: PatchOperation.PatchContentType });
  }//patch

  patchUserRole(id: string, opts: PatchOperation[]) {
    return this.httpClient.patch(`${this._URI}/UserRole/${id}`, opts, { headers: PatchOperation.PatchContentType });
  }//patch

  resetPassword(data: { accountId: string, password: string }) {
    return this.httpClient.post<void>(`${this._URI}/ResetPassword`, data, { headers: this._header });
  }//resetPassword

  batchDelete(ids: string) {
    return this.httpClient.post(`${this._URI}/batchDelete`, { ids: ids }, { headers: this._header });
  }//batchDelete
}
