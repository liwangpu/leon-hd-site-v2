import { Injectable } from '@angular/core';
import * as queryString from 'query-string';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Organization } from '../models/organization';
import { AppConfigService } from '@app/core';

@Injectable()
export class OrganizationService {

  Uri: string;
  header: HttpHeaders;//默认为application/json的Content-Type Header
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {
    this.Uri = `${this.appConfiSrv.APIServer}/basic/organizations`;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }//constructor

  getById(id: string) {
    return this.httpClient.get<Organization>(`${this.Uri}/${id}`);
  }//getById

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Organization[] }>(`${this.Uri}?${queryPart}`);
  }//query

  post(entity: Organization) {
    return this.httpClient.post<Organization>(`${this.Uri}`, entity);
  }//put

  patch(entity: Organization) {
    let hdr = new HttpHeaders({
      'Content-Type': 'application/json-patch+json'
    });
    return this.httpClient.patch(`${this.Uri}/${entity.id}`, Organization.GenPatchDoc(entity), { headers: hdr });
  }//patch


  batchDelete(ids: string) {
    return this.httpClient.post(`${this.Uri}/batchDelete`, { ids: ids }, { headers: this.header });
  }

  // put(entity: Organization) {
  //   return this.httpClient.put(`${this.Uri}/${entity.id}`, entity);
  // }//put

}
