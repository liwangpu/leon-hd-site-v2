import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Organization, OrganizationService } from '@app/feature/basic-ms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'basic-organization-detail-basic',
  templateUrl: './organization-detail-basic.component.html',
  styleUrls: ['./organization-detail-basic.component.scss']
})
export class OrganizationDetailBasicComponent implements OnInit {

  private _organization: Organization;
  get f() { return this.detailForm.controls; }
  @Input() set organization(val: Organization) {
    this.detailForm.patchValue(val);
    this._organization = val;
  }
  @Output() organizationChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected organSrv: OrganizationService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , ownerId: ['', []]
      , name: ['', [Validators.required]]
      , mail: ['', [Validators.email]]
      , phone: ['', [Validators.required]]
      , organizationTypeId: ['', [Validators.required]]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  onOrganTypeSelectd(organTypeId: number) {
    this.detailForm.patchValue({
      organizationTypeId: organTypeId
    });
  }//onOrganTypeSelectd

  onSave() {
    let data = this.detailForm.value;
    if (data.id == "") {
      this.organSrv.post(data).subscribe(res => {
        this.detailForm.patchValue(res);
        this._organization = { ...this._organization, ...res };
        this.organizationChange.next(this._organization);
        this.msgSrv.saveSuccessfully();
        this.detailForm.reset(res);
      });
    }
    else {
      this.organSrv.patch(data).subscribe(() => {
        this._organization = { ...this._organization, ...data };
        this.organizationChange.next(this._organization);
        this.msgSrv.saveSuccessfully();
        this.detailForm.reset(data);
      });
    }
  }//onSave

}
