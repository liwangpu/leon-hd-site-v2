import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product, ProductService, Category } from '@app/feature/morejee-ms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageCenterService } from '@app/core';
import { CategoryChangeSelectBoxComponent } from '../category-change-select-box/category-change-select-box.component';

@Component({
  selector: 'morejee-product-detail-basic',
  templateUrl: './product-detail-basic.component.html',
  styleUrls: ['./product-detail-basic.component.scss']
})
export class ProductDetailBasicComponent implements OnInit {

  private _product: Product;
  get f() { return this.detailForm.controls; }
  @Input() set product(val: Product) {
    if (!val) return;
    if (this._product) return;
    this._product = val;
    this.detailForm.patchValue(val);
    this.selectBoxCt.initCategoryName(val.categoryName);
  }
  @Output() productChange = new EventEmitter();
  @ViewChild('selectBoxCt',{static:true}) selectBoxCt: CategoryChangeSelectBoxComponent;
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected productSrv: ProductService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , categoryId: ['', []]
      , name: ['', [Validators.required]]
      , brand: ['', []]
      , unit: ['', []]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  onSave() {
    let data = this.detailForm.value;
    if (!data.id) {
      this.productSrv.post(data).subscribe(res => {
        this.msgSrv.saveSuccessfully();
        this.detailForm.patchValue(res);
        this._product = { ...this._product, ...res };
        this.productChange.next(this._product);
        this.detailForm.reset(data);
      });
    }
    else {
      this.productSrv.patch(data).subscribe(() => {
        this.msgSrv.saveSuccessfully();
        this._product = { ...this._product, ...data };
        this.productChange.next(this._product);
        this.detailForm.reset(data);
      });
    }
  }//onSave

  onCategoryChange(categoryId: string) {
    this.detailForm.patchValue({ categoryId: categoryId });
    this.detailForm.controls["categoryId"].markAsDirty();
  }//onCategoryChange

}
