import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as queryString from 'query-string';
import { Staticmesh } from '../models/staticmesh';
import { AppConfigService } from '@app/core';

@Injectable()
export class StaticmeshService {

  Uri: string;
  header: HttpHeaders;//默认为application/json的Content-Type Header
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {
    this.Uri = `${this.appConfiSrv.APIServer}/morejee/staticmeshs`;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }//constructor

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Staticmesh[] }>(`${this.Uri}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<Staticmesh>(`${this.Uri}/${id}`);
  }//getById


  post(entity: Staticmesh) {
    return this.httpClient.post<Staticmesh>(`${this.Uri}`, entity);
  }//put

  patch(entity: Staticmesh) {
    let hdr = new HttpHeaders({
      'Content-Type': 'application/json-patch+json'
    });
    return this.httpClient.patch(`${this.Uri}/${entity.id}`, Staticmesh.GenPatchDoc(entity), { headers: hdr });
  }//patch

  batchDelete(ids: string) {
    return this.httpClient.post(`${this.Uri}/batchDelete`, { ids: ids });
  }//batchDelete
}
