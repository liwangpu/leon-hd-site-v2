import { Component, OnInit, Input, ViewChild, TemplateRef, ViewContainerRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Category, CategoryService } from '@app/feature/morejee-ms';
import { NestedTreeControl, CdkTree } from '@angular/cdk/tree';
import { Subscription, fromEvent, Subject } from 'rxjs';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, take, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailBasicComponent } from '../category-detail-basic/category-detail-basic.component';
import { CategoryDataSource } from '../../models/category-data-source';
import { CategoryHierarchyChangeComponent } from '../category-hierarchy-change/category-hierarchy-change.component';


@Component({
  selector: 'morejee-category-detail-editor',
  templateUrl: './category-detail-editor.component.html',
  styleUrls: ['./category-detail-editor.component.scss']
})
export class CategoryDetailEditorComponent implements OnInit, OnDestroy {


  private _categoryId: string;
  _selectedCategoryId: string;
  _showLRValue = false;//显示节点左右值信息,仅用来调试
  sub: Subscription;
  @Input() set category(val: Category) {
    if (!val) return;
    this._categoryId = val.id;
    this.dataSource.refreshData(val);
  }
  @Output() createCategory = new EventEmitter();
  @Output() categoryChange = new EventEmitter<Category>();
  @Output() categorySelectChange = new EventEmitter<Category>();
  @ViewChild('catMenu', { static: true }) catMenu: TemplateRef<any>;
  @ViewChild('treeCt', { static: true }) treeCt: CdkTree<Category>;
  overlayRef: OverlayRef | null;
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new CategoryDataSource();
  destroy$ = new Subject();
  constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef, protected dialogSrv: MatDialog, protected catSrv: CategoryService) {

  }//constructor

  ngOnInit() {
    this.dataSource._dataSubject.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.treeControl.dataNodes = data;
      this.treeControl.expandAll();
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  openMenu({ x, y }: MouseEvent, cat: Category) {
    this.closeMenu();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x: x + 100, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.catMenu, this.viewContainerRef, {
      $implicit: cat
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.closeMenu())

  }//openMenu

  closeMenu() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }//closeMenu

  requestCategoryTree() {
    this.catSrv.getTreeById(this._categoryId).subscribe(cat => {
      this.dataSource.refreshData(cat);
      this.categoryChange.next(cat);
    });
  }//requestCategoryTree

  editCategory(cat: Category) {
    let ins = this.dialogSrv.open(CategoryDetailBasicComponent, { width: '400px', height: '500px', data: cat });
    ins.componentInstance.afterSave.subscribe(() => this.requestCategoryTree());
  }//editCategory

  addChildCategory(cat: Category) {
    // let ins = this.dialogSrv.open(CategoryDetailBasicComponent, { width: '400px', height: '500px', data: { parentId: cat.id, nodeType: cat.nodeType } });
    // ins.componentInstance.afterSave.subscribe(() => this.requestCategoryTree());
    this.createCategory.next({ parentId: cat.id, nodeType: cat.nodeType });
  }//addChildCategory

  deleteCategory(cat: Category) {
    this.catSrv.delete(cat.id).subscribe(() => this.requestCategoryTree());
  }//deleteCategory

  moveUpCategory(cat: Category) {
    this.catSrv.moveUp(cat.id).subscribe(() => this.requestCategoryTree());
  }//moveUpCategory

  moveDownCategory(cat: Category) {
    this.catSrv.moveDown(cat.id).subscribe(() => this.requestCategoryTree());
  }//moveDownCategory

  changeCategoryHierarchy(cat: Category) {
    let ins = this.dialogSrv.open(CategoryHierarchyChangeComponent, { width: '400px', height: '500px', data: { currentCategoryId: cat.id, rootCategoryId: this._categoryId } });
    ins.componentInstance.afterHierarchyChange.subscribe(() => this.requestCategoryTree());
  }//changeCategoryHierarchy

  selectCategory(cat: Category) {
    this._selectedCategoryId = cat.id;
    this.categorySelectChange.next(cat);
  }//selectCategory

}
