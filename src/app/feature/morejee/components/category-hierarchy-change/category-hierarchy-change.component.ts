import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Category, CategoryService } from '@app/feature/morejee-ms';
import { Subject } from 'rxjs';

@Component({
  selector: 'morejee-category-hierarchy-change',
  templateUrl: './category-hierarchy-change.component.html',
  styleUrls: ['./category-hierarchy-change.component.scss']
})
export class CategoryHierarchyChangeComponent implements OnInit, OnDestroy {


  _selectedCategory: Category;
  _selectedCategoryName: string;
  _currentCategoryId: string;
  category: Category;
  afterHierarchyChange = new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CategoryHierarchyChangeComponent>, protected formBuilder: FormBuilder, protected catSrv: CategoryService) {
    // console.log(1111, this.data.currentCategoryId, this.data.rootCategoryId);
    this._currentCategoryId = this.data.currentCategoryId;
  }//constructor

  ngOnInit() {
    this.catSrv.getTreeById(this.data.rootCategoryId, this.data.currentCategoryId).subscribe(cat => this.category = cat);
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterHierarchyChange.complete();
    this.afterHierarchyChange.unsubscribe();
  }//ngOnDestroy

  onCategorySelected(cat: Category) {
    this._selectedCategory = cat;
    this._selectedCategoryName = cat.name;
  }//onCategorySelected

  saveHierarchyChange() {
    this.catSrv.changeHierarchy(this._currentCategoryId, this._selectedCategory.id).subscribe(() => {
      this.afterHierarchyChange.next();
      setTimeout(() => {
        this.dialogRef.close();
      }, 100);
    });
  }//saveHierarchyChange

}
