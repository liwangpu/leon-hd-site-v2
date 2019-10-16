import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';

@Injectable()
export class IconService {

  private get _URI() {
    return `${this.configSrv.APIServer}/oss/icons`;
  }
  constructor(protected httpClient: HttpClient, protected configSrv: AppConfigService) {
  }//constructor

  upload(formData: FormData, headers: HttpHeaders) {
    return this.httpClient.post(`${this._URI}/form`, formData, { headers: headers, responseType: 'text' });
  }//upload
}
