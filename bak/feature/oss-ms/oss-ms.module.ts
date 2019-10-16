import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { FileassetService } from './services/fileasset.service';
import { IconService } from './services/icon.service';

@NgModule({

})
export class OssMsModule {

  constructor(@Optional() @SkipSelf() parentModule: OssMsModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OssMsModule,
      providers: [
        FileassetService,
        IconService
      ]
    };
  }//forRoot

}
