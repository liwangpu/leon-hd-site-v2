import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuardService } from './services/auth-guard.service';
import { LocalStoreService } from './services/local-store.service';
import { AppCacheService } from './services/app-cache.service';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { LocalizationInterceptorService } from './services/localization-interceptor.service';
import { MessageCenterService } from './services/message-center.service';
import { RouterRecorderService } from './services/router-recorder.service';
import { AppConfigService } from './services/app-config.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    MatSnackBarModule,
    TranslateModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    AuthService,
    AuthGuardService,
    LocalStoreService,
    AppCacheService,
    AppConfigService,
    RouterRecorderService,
    AuthInterceptorService,
    MessageCenterService,
    ErrorInterceptorService,
    LocalizationInterceptorService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }//forRoot
}
