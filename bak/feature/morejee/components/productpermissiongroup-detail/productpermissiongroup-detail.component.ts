import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageCenterService } from '@app/core';
import { Subject } from 'rxjs';
import { ProductPermissionGroupService, ProductPermissionGroup } from '@app/feature/morejee-ms';

@Component({
  selector: 'morejee-productpermissiongroup-detail',
  templateUrl: './productpermissiongroup-detail.component.html',
  styleUrls: ['./productpermissiongroup-detail.component.scss']
})
export class ProductpermissiongroupDetailComponent implements OnInit, OnDestroy {


  get f() { return this.detailForm.controls; }
  detailForm: FormGroup;
  afterSave = new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductpermissiongroupDetailComponent>, private formBuilder: FormBuilder, private msgSrv: MessageCenterService, private groupSrv: ProductPermissionGroupService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , name: ['', [Validators.required]]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {
    if (this.data && this.data.group)
      this.detailForm.patchValue(this.data.group);
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterSave.complete();
    this.afterSave.unsubscribe();
  }//ngOnDestroy

  onSave() {
    let data = this.detailForm.value;
    if (!data.id) {
      this.groupSrv.post(data).subscribe(res => {
        data.id = res.id;
        this.detailForm.reset(data);
        this.msgSrv.saveSuccessfully();
        this.afterSave.next();
        this.dialogRef.close();
      });
    }
    else {
      this.groupSrv.patch(data.id, ProductPermissionGroup.genPatchDoc(data)).subscribe(() => {
        this.msgSrv.saveSuccessfully();
        this.afterSave.next();
        this.dialogRef.close();
      });
    }
  }//onSave

}
