import { Component, PLATFORM_ID, Inject } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { AppCacheService, RouterRecorderService } from '@app/core';
// import { isPlatformBrowser } from '@angular/common';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // constructor(@Inject(PLATFORM_ID) platformId: string, private translateSrv: TranslateService, private cacheSrv: AppCacheService, protected router: Router, protected routerRecorderSrv: RouterRecorderService) {

  //   if (isPlatformBrowser(platformId)) {
  //     let lastLanguage = this.cacheSrv.lastLanguage;
  //     if (lastLanguage) {
  //       this.translateSrv.use(lastLanguage);
  //     }
  //     else {
  //       let broswerLang = this.translateSrv.getBrowserLang();
  //       broswerLang = broswerLang && broswerLang.match(/en|zh/) ? broswerLang : 'zh';
  //       this.translateSrv.use(broswerLang);
  //       this.cacheSrv.lastLanguage = broswerLang;
  //     }
  //     //记录最近访问的路由信息
  //     this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).pipe(map(evt => evt['url'])).subscribe(url => this.routerRecorderSrv.recordUrl(url));
  //   }//if
    
  // }//constructor

}
