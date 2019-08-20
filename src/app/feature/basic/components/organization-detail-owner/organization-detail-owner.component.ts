import { Component, OnInit, Input } from '@angular/core';
import { AccountService, Account } from '@app/feature/basic-ms';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailChangepwdComponent } from '../account-detail-changepwd/account-detail-changepwd.component';

@Component({
  selector: 'basic-organization-detail-owner',
  templateUrl: './organization-detail-owner.component.html',
  styleUrls: ['./organization-detail-owner.component.scss']
})
export class OrganizationDetailOwnerComponent implements OnInit {

  account: Account;
  @Input() set accountId(val: string) {
    this.accountSrv.getById(val).subscribe(acc => this.account = acc);
  }
  constructor(protected accountSrv: AccountService, protected dialogSrv: MatDialog) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  resetPassword() {
    this.dialogSrv.open(AccountDetailChangepwdComponent, { width: '400px', height: '300px', data: { accountId: this.account.id } });
  }//resetPassword

}
