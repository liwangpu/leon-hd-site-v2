import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService, Category } from '@app/feature/morejee-ms';
import { CategorySingleSelectDialogComponent } from '../category-single-select-dialog/category-single-select-dialog.component';

@Component({
  selector: 'morejee-category-change-select-box',
  templateUrl: './category-change-select-box.component.html',
  styleUrls: ['./category-change-select-box.component.scss']
})
export class CategoryChangeSelectBoxComponent implements OnInit {

  private _categoryTree: Category;

  @Input() categoryId: string;
  @Input() categoryName: string;
  @Input() set resource(val: string) {
    if (!val) return;
    this.categorySrv.getTreeByResource(val).subscribe(tree => this._categoryTree = tree);
  }
  @Output() categoryChange = new EventEmitter<string>();
  constructor(protected dialogSrv: MatDialog, protected categorySrv: CategoryService) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  initCategoryName(name: string) {
    this.categoryName = name;
  }//initDisplayValue

  onSelect() {
    let ins = this.dialogSrv.open(CategorySingleSelectDialogComponent, { width: "450px", height: "600px", data: { category: this._categoryTree } });
    ins.componentInstance.afterSelect.subscribe(cat => {
      this.categoryName = cat.name;
      this.categoryChange.next(cat.id);
    });
  }//onSelect

}
