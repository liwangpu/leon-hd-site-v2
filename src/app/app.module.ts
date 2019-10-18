import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
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
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appInitializerFn = (service: AppConfigService) => {
    return () => service.loadAppConfig();
};

const appAPIServerTokenFn = (service: AppConfigService) => {
    if (service.config) return service.config.APIServer;
    return '';
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
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFn,
            multi: true,
            deps: [AppConfigService, HttpClient]
        },
        {
            provide: APISERVER,
            useFactory: appAPIServerTokenFn,
            multi: true,
            deps: [AppConfigService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
