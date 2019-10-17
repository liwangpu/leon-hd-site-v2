import { Injectable, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppConfigService {

  APIServer: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private injector: Injector) { }

  loadAppConfig() {

    let browserMode = isPlatformBrowser(this.platformId);
    console.log(1, browserMode);
    if (browserMode) {
      let http = this.injector.get(HttpClient);
      return http.get('/assets/app-config.json').pipe(tap((data: any) => {
        this.APIServer = data["APIServer"];
        console.log('APIServer', this.APIServer);
      })).toPromise();
    }

    return Promise.resolve();
  }//loadAppConfig
}
