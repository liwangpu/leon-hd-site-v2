import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService, Category } from '@app/feature/morejee-ms';
import { MessageCenterService } from '@app/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'morejee-category-detail-basic',
  templateUrl: './category-detail-basic.component.html',
  styleUrls: ['./category-detail-basic.component.scss']
})
export class CategoryDetailBasicComponent implements OnInit, OnDestroy {


  get f() { return this.detailForm.controls; }
  @Output() afterSave = new EventEmitter<Category>();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected catSrv: CategoryService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['']
      , parentId: ['']
      , name: ['', [Validators.required]]
      , nodeType: ['', [Validators.required]]
      , resource: ['']
      , description: ['']
    });
    // if (this.data)
    //   this.detailForm.patchValue(data);
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
        // this.dialogRef.close();
      });
    }
    else {
      this.catSrv.patch(data).subscribe(() => {
        this.afterSave.next(data);
        this.msgSrv.saveSuccessfully();
        // this.dialogRef.close();
      });
    }
  }//saveCategory

  patchForm(cat: Category) {
    // console.log('vvv', cat);
    if (!cat) return;
    this.detailForm.reset();
    this.detailForm.patchValue(cat);
  }//patchForm
}
