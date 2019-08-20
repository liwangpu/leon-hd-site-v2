import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '@app/feature/basic-ms';
@Component({
  selector: 'basic-personal-setting',
  templateUrl: './personal-setting.component.html',
  styleUrls: ['./personal-setting.component.scss']
})
export class PersonalSettingComponent implements OnInit {

  account: Account;
  constructor(protected acr: ActivatedRoute) {
    this.account = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Account();
  }//constructor

  ngOnInit() {

  }//ngOnInit

}
