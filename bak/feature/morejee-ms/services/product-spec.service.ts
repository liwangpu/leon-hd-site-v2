import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import { ProductSpec } from '../models/product-spec';
import { PatchOperation } from '@app/feature/base-ms';
@Injectable()
export class ProductSpecService {

  private get _URI() {
    return `${this.appConfiSrv.APIServer}/morejee/productspecs`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {

  }//constructor

  getById(id: string) {
    return this.httpClient.get<ProductSpec>(`${this._URI}/${id}`);
  }//getById

  patch(id: string, doc: PatchOperation[]) {
    let hdr = new HttpHeaders({
      'Content-Type': 'application/json-patch+json'
    });
    return this.httpClient.patch(`${this._URI}/${id}`, doc, { headers: hdr });
  }//patch
}
