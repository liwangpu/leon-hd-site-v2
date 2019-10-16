import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, AuthInterceptorService, ErrorInterceptorService, LocalizationInterceptorService, AppConfigService } from '@app/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { BasicMsModule } from '@app/feature/basic-ms';
// import { MorejeeMsModule } from '@app/feature/morejee-ms';
// import { OssMsModule } from '@app/feature/oss-ms';
// import { OmsMsModule } from '@app/feature/oms-ms';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LocalizationInterceptorService, multi: true }
  , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/", suffix: ".json" }
  ]);
}
// export function HttpLoaderFactory(http: HttpClient) {
//   return new MultiTranslateHttpLoader(http, [
//     { prefix: "./assets/i18n/core/", suffix: ".json" }
//     , { prefix: "./assets/i18n/main/", suffix: ".json" }
//     , { prefix: "./assets/i18n/basic/", suffix: ".json" }
//     , { prefix: "./assets/i18n/morejee/", suffix: ".json" }
//     , { prefix: "./assets/i18n/designer/", suffix: ".json" }
//     , { prefix: "./assets/i18n/public/", suffix: ".json" }
//   ]);
// }

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-angular-app' }),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
