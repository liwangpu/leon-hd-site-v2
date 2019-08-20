import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Category } from '@app/feature/morejee-ms';
import { CategoryDataSource } from '../../models/category-data-source';


@Component({
  selector: 'morejee-category-single-select-panel',
  templateUrl: './category-single-select-panel.component.html',
  styleUrls: ['./category-single-select-panel.component.scss']
})
export class CategorySingleSelectPanelComponent implements OnInit {

  _selectedCategoryId: string;
  @Input() set category(val: Category) {
    if (!val) return;
    this.dataSource.refreshData(val);
  }
  @Input() set selectId(val: string) {
    this._selectedCategoryId = val;
  }
  @Output() categorySelected = new EventEmitter<Category>();
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new CategoryDataSource();
  constructor() {

  }//constructor

  ngOnInit() {
    this.dataSource._dataSubject.subscribe(data => {
      this.treeControl.dataNodes = data;
      this.treeControl.expandAll();
    });//subscribe
  }//ngOnInit

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  onNodeSelected(cat: Category) {
    this._selectedCategoryId = cat.id;
    let node = { ...cat, children: null };
    this.categorySelected.next(node);
  }//onNodeSelected

}
