import { Component, OnInit, Inject, Output, Input, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AccessPointService, AccessPoint } from '@app/feature/basic-ms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'basic-access-point-detail',
  templateUrl: './access-point-detail.component.html',
  styleUrls: ['./access-point-detail.component.scss']
})
export class AccessPointDetailComponent implements OnInit, OnDestroy {

  get f() { return this.detailForm.controls; }
  afterSave = new Subject();
  detailForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AccessPointDetailComponent>, protected formBuilder: FormBuilder, protected acpSrv: AccessPointService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , name: ['', [Validators.required]]
      , pointKey: ['', [Validators.required]]
      , description: ['', []]
    });
    if (this.data)
      this.detailForm.patchValue(this.data);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.afterSave.complete();
    this.afterSave.unsubscribe();
  }//ngOnDestroy

  onSave() {
    let data = this.detailForm.value;
    if (!data.id) {
      this.acpSrv.post(data).subscribe(res => {
        this.msgSrv.saveSuccessfully();
        this.afterSave.next();
        this.dialogRef.close();
      });
    }
    else {
      this.acpSrv.patch(data.id, AccessPoint.GenPatchDoc(data)).subscribe(() => {
        this.msgSrv.saveSuccessfully();
        this.afterSave.next();
        this.dialogRef.close();
      });
    }
  }//onSave

}
