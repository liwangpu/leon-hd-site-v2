import { Injectable } from '@angular/core';
import * as queryString from 'query-string';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../models/role';
import { AppConfigService } from '@app/core';
@Injectable()
export class RoleService {

  Uri: string;
  header: HttpHeaders;//默认为application/json的Content-Type Header
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {
    this.Uri = `${this.appConfiSrv.APIServer}/basic/roles`;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }//constructor

  getById(id: string) {
    return this.httpClient.get<Role>(`${this.Uri}/${id}`);
  }//get

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Role[] }>(`${this.Uri}?${queryPart}`);
  }//query

  put(entity: Role) {
    return this.httpClient.put(`${this.Uri}/${entity.id}`, entity);
  }//put

}
