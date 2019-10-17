import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CoreModule, AuthInterceptorService, ErrorInterceptorService, LocalizationInterceptorService, AppConfigService } from '@app/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APISERVER } from 'app-common';
import { CoreModule, AppConfigService } from '@app/core';

/** Http interceptor providers in outside-in order */
// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: LocalizationInterceptorService, multi: true }
//   , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
//   , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
// ];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/", suffix: ".json" }
  ]);
}

// const appInitializerFn = (appConfig: AppConfigService) => {
//   return () => {
//     return appConfig.loadAppConfig();
//   }
// };

const appAPIServerTokenFn = (appConfig: AppConfigService) => {
  console.log(23);
  return () => appConfig.loadAppConfig();


  // return "12312321";
  // appConfig.loadAppConfig().then()
}//appAPIServerTokenFn

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
    CoreModule
  ],
  providers: [
    {
      provide: APISERVER,
      useFactory: appAPIServerTokenFn,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
