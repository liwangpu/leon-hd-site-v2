import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { BasicRoutingModule } from './basic-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
//components
import { OrganizationComponent } from './components/organization/organization.component';
import { AccountComponent } from './components/account/account.component';
import { RoleComponent } from './components/role/role.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { OrganizationTypeSelectboxComponent } from './components/commons/organization-type-selectbox/organization-type-selectbox.component';
import { OrganizationResolverService } from './services/organization-resolver.service';
import { OrganizationDetailBasicComponent } from './components/organization-detail-basic/organization-detail-basic.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountResolverService } from './services/account-resolver.service';
import { AccountDetailBasicComponent } from './components/account-detail-basic/account-detail-basic.component';
import { AccountDetailChangepwdComponent } from './components/account-detail-changepwd/account-detail-changepwd.component';
import { AccountFilterComponent } from './components/account-filter/account-filter.component';
import { OrganizationDetailOwnerComponent } from './components/organization-detail-owner/organization-detail-owner.component';
import { AccessPointComponent } from './components/access-point/access-point.component';
import { AccessPointDetailComponent } from './components/access-point-detail/access-point-detail.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleResolverService } from './services/role-resolver.service';
import { RoleDetailAccesspointComponent } from './components/role-detail-accesspoint/role-detail-accesspoint.component';
import { CustomroleComponent } from './components/customrole/customrole.component';
import { CustomroleDetailComponent } from './components/customrole-detail/customrole-detail.component';
import { CustomroleDetailBasicComponent } from './components/customrole-detail-basic/customrole-detail-basic.component';
import { CustomRoleResolverService } from './services/custom-role-resolver.service';
import { CustomroleDetailAccesspointComponent } from './components/customrole-detail-accesspoint/customrole-detail-accesspoint.component';
import { AccountDetailUserroleComponent } from './components/account-detail-userrole/account-detail-userrole.component';
import { MorejeeAuxModule } from '@app/feature/morejee-aux';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalSettingComponent } from './components/personal-setting/personal-setting.component';
import { PersonalSettingBasicComponent } from './components/personal-setting-basic/personal-setting-basic.component';
import { CurrentAccountResolverService } from './services/current-account-resolver.service';


@NgModule({
  declarations: [OrganizationComponent, AccountComponent, RoleComponent, OrganizationDetailComponent, OrganizationTypeSelectboxComponent, OrganizationDetailBasicComponent, AccountDetailComponent, AccountDetailBasicComponent, AccountDetailChangepwdComponent, AccountFilterComponent, OrganizationDetailOwnerComponent, AccessPointComponent, AccessPointDetailComponent, RoleDetailComponent, RoleDetailAccesspointComponent, CustomroleComponent, CustomroleDetailComponent, CustomroleDetailBasicComponent, CustomroleDetailAccesspointComponent, AccountDetailUserroleComponent, ProfileComponent, PersonalSettingComponent, PersonalSettingBasicComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDialogModule,
    SharedModule,
    MorejeeAuxModule,
    BasicRoutingModule
  ],
  providers: [
    OrganizationResolverService,
    AccountResolverService,
    RoleResolverService,
    CustomRoleResolverService,
    CurrentAccountResolverService
  ],
  entryComponents: [
    AccountDetailChangepwdComponent,
    AccountFilterComponent,
    AccessPointDetailComponent
  ]
})
export class BasicModule { }
