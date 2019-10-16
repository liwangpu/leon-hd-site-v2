import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { OrganizationService } from './services/organization.service';
import { RoleService } from './services/role.service';
import { AccountService } from './services/account.service';
import { OrganizationTypeService } from './services/organization-type.service';
import { UserRoleService } from './services/user-role.service';
import { AccessPointService } from './services/access-point.service';
import { CustomRoleService } from './services/custom-role.service';
import { TokenService } from './services/token.service';


@NgModule({

})
export class BasicMsModule {

  constructor(@Optional() @SkipSelf() parentModule: BasicMsModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BasicMsModule,
      providers: [
        OrganizationService,
        RoleService,
        AccountService,
        OrganizationTypeService,
        UserRoleService,
        AccessPointService,
        CustomRoleService,
        TokenService
      ]
    };
  }//forRoot
  
}
