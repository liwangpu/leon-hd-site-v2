import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import { CustomRole } from '../models/custom-role';
import * as queryString from 'query-string';
import { PatchOperation } from '@app/feature/base-ms';

@Injectable()
export class CustomRoleService {

  private get _URI() {
    return `${this.configSrv.APIServer}/Basic/CustomRoles`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected configSrv: AppConfigService) {
  }//constructor


  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: CustomRole[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<CustomRole>(`${this._URI}/${id}`);
  }//get

  post(entity: CustomRole) {
    return this.httpClient.post<CustomRole>(this._URI, entity, { headers: this._header });
  }

  patch(id: string, doc: PatchOperation[]) {
    return this.httpClient.patch(`${this._URI}/${id}`, doc, { headers: PatchOperation.PatchContentType });
  }//patch
}
