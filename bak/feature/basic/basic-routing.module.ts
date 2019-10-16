import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './components/organization/organization.component';
import { RoleComponent } from './components/role/role.component';
import { AccountComponent } from './components/account/account.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { OrganizationResolverService } from './services/organization-resolver.service';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountResolverService } from './services/account-resolver.service';
import { AccessPointComponent } from './components/access-point/access-point.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleResolverService } from './services/role-resolver.service';
import { CustomroleComponent } from './components/customrole/customrole.component';
import { CustomroleDetailComponent } from './components/customrole-detail/customrole-detail.component';
import { CustomRoleResolverService } from './services/custom-role-resolver.service';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalSettingComponent } from './components/personal-setting/personal-setting.component';
import { CurrentAccountResolverService } from './services/current-account-resolver.service';

const routes: Routes = [
  {
    path: 'personal-setting'
    , component: PersonalSettingComponent
    , resolve: {
      entity: CurrentAccountResolverService
    }
  }
  , {
    path: 'account'
    , component: AccountComponent
  }
  , {
    path: 'account/detail'
    , component: AccountDetailComponent
  }
  , {
    path: 'account/detail/:id'
    , component: AccountDetailComponent
    , resolve: {
      entity: AccountResolverService
    }
  }
  , {
    path: 'role'
    , component: RoleComponent
  }
  , {
    path: 'role/detail'
    , component: RoleDetailComponent
  }
  , {
    path: 'role/detail/:id'
    , component: RoleDetailComponent
    , resolve: {
      entity: RoleResolverService
    }
  }
  , {
    path: 'organization'
    , component: OrganizationComponent
  }
  , {
    path: 'organization/detail'
    , component: OrganizationDetailComponent
  }
  , {
    path: 'organization/detail/:id'
    , component: OrganizationDetailComponent
    , resolve: {
      entity: OrganizationResolverService
    }
  }
  , {
    path: 'access-point'
    , component: AccessPointComponent
  }
  , {
    path: 'custom-role'
    , component: CustomroleComponent
  }
  , {
    path: 'custom-role/detail'
    , component: CustomroleDetailComponent
  }
  , {
    path: 'custom-role/detail/:id'
    , component: CustomroleDetailComponent
    , resolve: {
      entity: CustomRoleResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
