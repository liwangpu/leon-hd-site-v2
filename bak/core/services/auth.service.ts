import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AppCacheService } from './app-cache.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, protected cacheSrv: AppCacheService) {

  }//constructor

  get tokenValid() {


    if (!isPlatformBrowser(this.platformId)) return false;


    let hasToken = this.cacheSrv.token ? true : false;
    // let tokenNotExpired = new Date(this.cacheSrv.tokenExpires) > new Date();
    // if (hasToken && tokenNotExpired)
    //   return true;

    if (hasToken)
      return true;

    return false;
  }//tokenValid


}
