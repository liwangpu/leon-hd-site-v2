import { Component, OnInit, Input } from '@angular/core';
import { CustomRoleService, CustomRole, Account, UserRole, AccountService, UserRoleService } from '@app/feature/basic-ms';
import { SimpleViewerTableColumn } from '@app/shared';
import { tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'basic-account-detail-userrole',
  templateUrl: './account-detail-userrole.component.html',
  styleUrls: ['./account-detail-userrole.component.scss']
})
export class AccountDetailUserroleComponent implements OnInit {

  customRoleDefs: SimpleViewerTableColumn[] = [
    {
      name: 'form.name',
      field: 'name'
    },
    {
      name: 'form.description',
      field: 'description'
    }
  ];
  selectedCustomRoleIds: string[];
  allCustomRoles: CustomRole[];
  @Input() account: Account;
  constructor(protected customRoleSrv: CustomRoleService, protected accountSrv: AccountService, protected userRoleSrv: UserRoleService) {

  }//constructor

  ngOnInit() {
    let cusRoleQ = this.customRoleSrv.query({ pageSize: 9999 }).pipe(tap(res => this.allCustomRoles = res.data));
    let userRoleQ = this.userRoleSrv.getAccountUserRole(this.account.id).pipe(tap(roles => this.selectedCustomRoleIds = roles.map(x => x.customRoleId)));

    forkJoin(cusRoleQ, userRoleQ).subscribe();
  }//ngOnInit

  onUserRoleChange(roles: UserRole[]) {
    let ids = roles && roles.length > 0 ? roles.map(x => x.id) : [];
    this.accountSrv.patchUserRole(this.account.id, Account.genUserRolePathDoc(ids.join(","))).subscribe();
  }//onUserRoleChange

}
