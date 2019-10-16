import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserRole } from '../models/user-role';
import { AppConfigService } from '@app/core';
@Injectable()
export class UserRoleService {

  private get _URI() {
    return `${this.appConfiSrv.APIServer}/Basic/Userroles`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {
  }//constructor

  getAccountUserRole(accountId: string) {
    return this.httpClient.get<UserRole[]>(`${this._URI}?accountId=${accountId}`);
  }//query

  // post(accountId: string, roleId: number) {
  //   let entity = {
  //     accountId: accountId,
  //     roleId: roleId
  //   };
  //   return this.httpClient.post<UserRole>(`${this._URI}`, entity);
  // }//post

  // batchDelete(ids: string) {
  //   return this.httpClient.delete(`${this._URI}?ids=${ids}`);
  // }//batchDelete
}
