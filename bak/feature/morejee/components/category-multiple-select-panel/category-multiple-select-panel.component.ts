import { Component, OnInit, Input } from '@angular/core';
import { Category } from '@app/feature/morejee-ms';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'morejee-category-multiple-select-panel',
  templateUrl: './category-multiple-select-panel.component.html',
  styleUrls: ['./category-multiple-select-panel.component.scss']
})
export class CategoryMultipleSelectPanelComponent implements OnInit {


  private transformer = (node: Category, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  @Input() set category(val: Category) {
    this.dataSource.data = [val];
    this.treeControl.expandAll();
  }
  checklistSelection = new SelectionModel<Category>(true /* multiple */);
  treeControl = new FlatTreeControl<Category>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    // this.dataSource.data = TREE_DATA;
  }//constructor

  ngOnInit(): void {
    this.checklistSelection.changed.pipe(debounceTime(200)).subscribe(res => {
      console.log('selected change:', res.source.selected);
    });
    // this.dataSource.
  }//ngOnInit

  hasChild = (_: number, node: Category) => node.expandable;

  getLevel = (node: Category) => node.level;

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: Category): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: Category): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: Category): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: Category): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }//todoItemSelectionToggle

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: Category): void {
    let parent: Category | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: Category): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: Category): Category | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

}
