import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductSpecService, ProductSpec } from '@app/feature/morejee-ms';
import { Subject } from 'rxjs';

@Component({
  selector: 'morejee-product-specification-detail',
  templateUrl: './product-specification-detail.component.html',
  styleUrls: ['./product-specification-detail.component.scss']
})
export class ProductSpecificationDetailComponent implements OnInit, OnDestroy {


  get f() { return this.detailForm.controls; }
  detailForm: FormGroup;
  afterSave = new Subject<ProductSpec>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductSpecificationDetailComponent>, protected formBuilder: FormBuilder, private specSrv: ProductSpecService) {
    this.detailForm = this.formBuilder.group({
      id: ['']
      , productId: ['', [Validators.required]]
      , name: ['', [Validators.required]]
      , price: ['']
      , partnerPrice: ['']
      , purchasePrice: ['']
      , description: ['']
    });
  }//constructor

  ngOnInit() {
    if (this.data)
      this.detailForm.patchValue(this.data);
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterSave.complete();
    this.afterSave.unsubscribe();
  }//ngOnDestroy

  onSave() {
    let entity = this.detailForm.value;
    if (entity.id) {
      this.specSrv.patch(entity.id, ProductSpec.GenPatchDoc(entity)).subscribe(() => {
        this.afterSave.next(entity);
        this.dialogRef.close();
      });
    }
  }//onSave

}
