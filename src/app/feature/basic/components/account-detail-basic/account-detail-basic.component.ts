import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Account, AccountService } from '@app/feature/basic-ms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'basic-account-detail-basic',
  templateUrl: './account-detail-basic.component.html',
  styleUrls: ['./account-detail-basic.component.scss']
})
export class AccountDetailBasicComponent implements OnInit {

  private _account: Account;
  get f() { return this.detailForm.controls; }
  @Input() set account(val: Account) {
    this.detailForm.patchValue(val);
    this._account = val;
  }
  @Output() accountChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected accountSrv: AccountService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , lastName: ['', [Validators.required]]
      , firstName: ['', [Validators.required]]
      , mail: ['', [Validators.email]]
      , phone: ['', [Validators.required]]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  onSave() {
    let data = this.detailForm.value;
    if (!data.id) {
      this.accountSrv.post(data).subscribe(res => {
        this.msgSrv.saveSuccessfully();
        this._account = { ...this._account, ...res };
        this.accountChange.next(this._account);
        this.detailForm.reset(data);
      });
    }
    else {
      this.accountSrv.patch(data.id,Account.genPatchDoc(data)).subscribe(() => {
        this.msgSrv.saveSuccessfully();
        this._account = { ...this._account, ...data };
        this.accountChange.next(this._account);
        this.detailForm.reset(data);
      });
    }
  }//onSave

}
