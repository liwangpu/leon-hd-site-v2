import { Injectable, Inject, PLATFORM_ID, APP_INITIALIZER } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AppConfig } from '../models/app-config';

@Injectable()
export class AppConfigService {

    config: AppConfig;
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

    loadAppConfig() {
        let browserMode = isPlatformBrowser(this.platformId);
        if (browserMode) {
            return this.http.get('/assets/app-config.json').pipe(tap((data: any) => {
                this.config = data;
            })).toPromise();
        }

        return Promise.resolve();
    }//loadAppConfig
}
