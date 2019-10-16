import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
//mat modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MorejeeRoutingModule } from './morejee-routing.module';
import { StaticmeshComponent } from './components/staticmesh/staticmesh.component';
import { MaterialComponent } from './components/material/material.component';
import { StaticmeshDetailComponent } from './components/staticmesh-detail/staticmesh-detail.component';
import { StaticmeshResolverService } from './services/staticmesh-resolver.service';
import { StaticmeshDetailBasicComponent } from './components/staticmesh-detail-basic/staticmesh-detail-basic.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryResolverService } from './services/category-resolver.service';
import { CategoryDetailEditorComponent } from './components/category-detail-editor/category-detail-editor.component';
import { CategoryDetailBasicComponent } from './components/category-detail-basic/category-detail-basic.component';
import { CategoryDetailNewComponent } from './components/category-detail-new/category-detail-new.component';
import { CategorySelectDialogComponent } from './components/category-select-dialog/category-select-dialog.component';
import { CategoryHierarchyChangeComponent } from './components/category-hierarchy-change/category-hierarchy-change.component';
import { CategorySingleSelectPanelComponent } from './components/category-single-select-panel/category-single-select-panel.component';
import { CategoryMultipleSelectPanelComponent } from './components/category-multiple-select-panel/category-multiple-select-panel.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductResolverService } from './services/product-resolver.service';
import { ProductDetailBasicComponent } from './components/product-detail-basic/product-detail-basic.component';
import { ProductDetailSpecificationComponent } from './components/product-detail-specification/product-detail-specification.component';
import { ProductSpecificationDetailComponent } from './components/product-specification-detail/product-specification-detail.component';
import { ProductSpecResolverService } from './services/product-spec-resolver.service';
import { MapComponent } from './components/map/map.component';
import { TextureComponent } from './components/texture/texture.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialResolverService } from './services/material-resolver.service';
import { MaterialDetailBasicComponent } from './components/material-detail-basic/material-detail-basic.component';
import { CategoryChangeSelectBoxComponent } from './components/category-change-select-box/category-change-select-box.component';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { CategorySingleSelectDialogComponent } from './components/category-single-select-dialog/category-single-select-dialog.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { PointkeyResolverService } from './services/pointkey-resolver.service';
import { ProductpermissiongroupComponent } from './components/productpermissiongroup/productpermissiongroup.component';
import { ProductpermissiongroupDetailComponent } from './components/productpermissiongroup-detail/productpermissiongroup-detail.component';
import { MorejeeAuxModule } from '@app/feature/morejee-aux';
import { BasicAuxModule } from '@app/feature/basic-aux';
import { SolutionComponent } from './components/solution/solution.component';
import { SolutionResolverService } from './services/solution-resolver.service';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionDetailBasicComponent } from './components/solution-detail-basic/solution-detail-basic.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [StaticmeshComponent, MaterialComponent, StaticmeshDetailComponent, StaticmeshDetailBasicComponent, CategoryComponent, CategoryDetailComponent, CategoryDetailEditorComponent, CategoryDetailBasicComponent, CategoryDetailNewComponent, CategorySelectDialogComponent, CategoryHierarchyChangeComponent, CategorySingleSelectPanelComponent, CategoryMultipleSelectPanelComponent, ProductComponent, ProductDetailComponent, ProductDetailBasicComponent, ProductDetailSpecificationComponent, ProductSpecificationDetailComponent, MapComponent, TextureComponent, MaterialDetailComponent, MaterialDetailBasicComponent, CategoryChangeSelectBoxComponent, CategorySingleSelectDialogComponent, ProductFilterComponent, ProductpermissiongroupComponent, ProductpermissiongroupDetailComponent, SolutionComponent, SolutionDetailComponent, SolutionDetailBasicComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MorejeeRoutingModule,
    SharedModule,
    MorejeeAuxModule,
    BasicAuxModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatTreeModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    CdkTreeModule,
    MatTableModule,
    DragDropModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    StaticmeshResolverService,
    CategoryResolverService,
    ProductResolverService,
    ProductSpecResolverService,
    MaterialResolverService,
    PointkeyResolverService,
    SolutionResolverService
  ],
  entryComponents: [
    CategoryDetailBasicComponent,
    CategoryDetailNewComponent,
    CategorySelectDialogComponent,
    CategoryHierarchyChangeComponent,
    CategorySingleSelectDialogComponent,
    ProductFilterComponent,
    ProductpermissiongroupDetailComponent,
    ProductSpecificationDetailComponent
  ]
})
export class MorejeeModule { }
