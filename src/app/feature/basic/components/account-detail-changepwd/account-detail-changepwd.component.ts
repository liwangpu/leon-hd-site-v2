import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '@app/feature/basic-ms';
import { MessageCenterService } from '@app/core';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-account-detail-changepwd',
  templateUrl: './account-detail-changepwd.component.html',
  styleUrls: ['./account-detail-changepwd.component.scss']
})
export class AccountDetailChangepwdComponent implements OnInit {

  get pwdMinLengthParam() { return { value: 6 }; }
  get f() { return this.detailForm.controls; }
  detailForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AccountDetailChangepwdComponent>, protected formBuilder: FormBuilder, protected accountSrv: AccountService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      accountId: ['', [Validators.required]]
      , password: ['', [Validators.required, Validators.minLength(6)]]
      , confirmPassword: ['', [Validators.required]]
    });
    this.detailForm.valueChanges.subscribe(val => {
      if (val.confirmPassword && val.confirmPassword != val.password) {
        this.detailForm.controls["confirmPassword"].setErrors({ inconfirmity: true });
      }//if
    });
    this.detailForm.patchValue(this.data);
  }//constructor

  ngOnInit() {
  }//ngOnInit

  resetPassword() {
    let data = this.detailForm.value;
    let encryptedData = { accountId: data.accountId, password: Md5.hashStr(data.password).toString() };
    this.accountSrv.resetPassword(encryptedData).subscribe(() => {
      this.msgSrv.saveSuccessfully();
      this.dialogRef.close();
    });
  }//resetPassword
}
