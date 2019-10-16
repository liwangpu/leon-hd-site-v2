import { Component, OnInit } from '@angular/core';
import { Account } from '@app/feature/basic-ms';
import { DetailViewerLauncher, DetailViewerOpsatService } from '@app/shared';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailChangepwdComponent } from '../account-detail-changepwd/account-detail-changepwd.component';

@Component({
  selector: 'basic-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class AccountDetailComponent extends DetailViewerLauncher implements OnInit {

  account: Account;
  constructor(protected acr: ActivatedRoute, public opsat: DetailViewerOpsatService, protected dialogSrv: MatDialog) {
    super(opsat);

    this.account = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Account();

    // this.account = this.acr.snapshot.data['entity'];
    // if (!this.account) {
    //   let entity = new Account();
    //   entity.name = "小黑";
    //   entity.mail = "hei@bamboo.com";
    //   entity.phone = "15721457986";
    //   this.account = entity;
    // }

  }//constructor

  ngOnInit() {

  }//ngOnInit

  resetPasssword() {
    this.dialogSrv.open(AccountDetailChangepwdComponent, { width: '400px', height: '300px', data: { accountId: this.account.id } });
  }//resetPasssword

}
