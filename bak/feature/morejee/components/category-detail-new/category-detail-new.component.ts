import { Component, OnInit, Inject } from '@angular/core';
import { Category, CategoryService } from '@app/feature/morejee-ms';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'app-category-detail-new',
  templateUrl: './category-detail-new.component.html',
  styleUrls: ['./category-detail-new.component.scss']
})
export class CategoryDetailNewComponent implements OnInit {

  get f() { return this.detailForm.controls; }
  afterSave = new Subject<Category>();
  detailForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CategoryDetailNewComponent>, protected formBuilder: FormBuilder, protected catSrv: CategoryService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['']
      , parentId: ['']
      , name: ['', [Validators.required]]
      , nodeType: ['', [Validators.required]]
      , resource: ['']
      , description: ['']
    });
    if (this.data)
      this.detailForm.patchValue(data);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.afterSave.complete();
    this.afterSave.unsubscribe();
  }//ngOnDestroy

  saveCategory() {
    let data = this.detailForm.value;
    if (!data.id) {
      this.catSrv.post(data).subscribe(res => {
        this.afterSave.next(res);
        this.msgSrv.saveSuccessfully();
        this.dialogRef.close();
      });
    }
    else {
      this.catSrv.patch(data).subscribe(() => {
        this.afterSave.next(data);
        this.msgSrv.saveSuccessfully();
        this.dialogRef.close();
      });
    }
  }//saveCategory

}
