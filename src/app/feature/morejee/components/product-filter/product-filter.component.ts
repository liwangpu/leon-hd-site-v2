import { Component, OnInit, Optional, Inject, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'morejee-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  searchForm: FormGroup;
  search = new Subject<any>();
  clearSearch = new Subject<any>();
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductFilterComponent>, protected formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      minPrice: ['']
      , maxPrice: ['']
      , minPartnerPrice: ['']
      , maxPartnerPrice: ['']
      , minPurchasePrice: ['']
      , maxPurchasePrice: ['']
      , priceNotSet: ['']
      , partnerPriceNotSet: ['']
      , purchasePriceNotSet: ['']
    });
    // console.log();
  }//constructor

  ngOnInit() {

  }//ngOnInit

  onPriceNotSetChange(evt: MatCheckboxChange) {
    this.searchForm.patchValue({ priceNotSet: evt.checked });
    if (evt.checked)
      this.searchForm.controls["priceNotSet"].markAsDirty();
    else
      this.searchForm.controls["priceNotSet"].markAsPristine();
  }//onPriceNotSetChange

  onPartnerPriceNotSetChange(evt: MatCheckboxChange) {
    this.searchForm.patchValue({ partnerPriceNotSet: evt.checked });
    if (evt.checked)
      this.searchForm.controls["partnerPriceNotSet"].markAsDirty();
    else
      this.searchForm.controls["partnerPriceNotSet"].markAsPristine();
  }//onPartnerPriceNotSetChange

  onPurchasePriceNotSetChange(evt: MatCheckboxChange) {
    this.searchForm.patchValue({ purchasePriceNotSet: evt.checked });
    if (evt.checked)
      this.searchForm.controls["purchasePriceNotSet"].markAsDirty();
    else
      this.searchForm.controls["purchasePriceNotSet"].markAsPristine();
  }//onPurchasePriceNotSetChange

  onSearch() {
    // let data1 = this.searchForm.value;
    // console.log(1, data);
    // this.search.next(data);
    // this.dialogRef.close();
    let data = {};
    Object.keys(this.searchForm.controls).forEach(key => {
      let currentControl = this.searchForm.controls[key];
      if (currentControl.dirty) {
        data[key] = currentControl.value;
      }//if
    });

    console.log(111, data);
    this.search.next(data);
    this.dialogRef.close();
  }//onSearch

  onClearSearch() {
    this.dialogRef.close();
  }//onClearSearch

}
