import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomRole, CustomRoleService } from '@app/feature/basic-ms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'basic-customrole-detail-basic',
  templateUrl: './customrole-detail-basic.component.html',
  styleUrls: ['./customrole-detail-basic.component.scss']
})
export class CustomroleDetailBasicComponent implements OnInit {
  private _customRole: CustomRole;
  get f() { return this.detailForm.controls; }
  @Input() set customRole(val: CustomRole) {
    if (!val) return;
    if (this._customRole) return;
    this._customRole = val;
    this.detailForm.patchValue(val);
  }
  @Output() customRoleChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected apiSrv: CustomRoleService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , name: ['', [Validators.required]]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {
  }//ngOnInit

  onSave() {
    let data = this.detailForm.value;
    if (!data.id) {
      this.apiSrv.post(data).subscribe(res => {
        this.msgSrv.saveSuccessfully();
        this.detailForm.patchValue(res);
        this._customRole = { ...this._customRole, ...res };
        this.customRoleChange.next(this._customRole);
        this.detailForm.reset(this._customRole);
      });
    }
    else {
      this.apiSrv.patch(data.id, CustomRole.genPatchDoc(data)).subscribe(() => {
        this.msgSrv.saveSuccessfully();
        this._customRole = { ...this._customRole, ...data };
        this.customRoleChange.next(this._customRole);
        this.detailForm.reset(data);
      });
    }
  }//onSave

}
