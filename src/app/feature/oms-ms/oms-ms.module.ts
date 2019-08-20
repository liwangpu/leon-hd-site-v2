import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { OrderService } from './services/order.service';
import { CustomerService } from './services/customer.service';

@NgModule({
})
export class OmsMsModule {

  constructor(@Optional() @SkipSelf() parentModule: OmsMsModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OmsMsModule,
      providers: [
        OrderService,
        CustomerService
      ]
    };
  }//forRoot
}
