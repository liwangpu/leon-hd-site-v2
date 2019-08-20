import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService, Account } from '@app/feature/basic-ms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'basic-personal-setting-basic',
  templateUrl: './personal-setting-basic.component.html',
  styleUrls: ['./personal-setting-basic.component.scss']
})
export class PersonalSettingBasicComponent implements OnInit {
  private _account: Account;

  get f() { return this.detailForm.controls; }
  @Input() set account(val: Account) {
    this.detailForm.patchValue(val);
    this._account = val;
  }
  @Output() accountChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected accSrv: AccountService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , firstName: ['', [Validators.required]]
      , lastName: ['', [Validators.required]]
      , mail: ['', [Validators.email]]
      , phone: ['', [Validators.required]]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {
  }//ngOnInit

  onSave() {
    let data = this.detailForm.value;
    this.accSrv.patch(this._account.id, Account.genPatchDoc(data)).subscribe(() => {
      this.msgSrv.saveSuccessfully();
      this._account = { ...this._account, ...data };
      this.accountChange.next(this._account);
      this.detailForm.reset(data);
    });
  }//onSave
}
