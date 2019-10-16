import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '@app/feature/morejee-ms';
import { Subject } from 'rxjs';

@Component({
  selector: 'morejee-category-single-select-dialog',
  templateUrl: './category-single-select-dialog.component.html',
  styleUrls: ['./category-single-select-dialog.component.scss']
})
export class CategorySingleSelectDialogComponent implements OnInit, OnDestroy {

  private _selectedCategory: Category;
  _selectedCategoryName: string;
  _categoryTree: Category;
  afterSelect = new Subject<Category>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CategorySingleSelectDialogComponent>) {
    if (this.data && this.data.category)
      this._categoryTree = this.data.category;
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.afterSelect.complete();
    this.afterSelect.unsubscribe();
  }//ngOnDestroy

  onCategorySelect(cat: Category) {
    this._selectedCategoryName = cat.name;
    this._selectedCategory = cat;
  }//onCategorySelect

  onConfirm() {
    this.afterSelect.next(this._selectedCategory);
    this.dialogRef.close();
  }//onConfirm

}
