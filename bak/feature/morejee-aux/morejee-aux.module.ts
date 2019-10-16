import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSelectDialogComponent } from './components/product-select-dialog/product-select-dialog.component';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrganizationPermissinProductComponent } from './components/organization-permissin-product/organization-permissin-product.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [ProductSelectDialogComponent, OrganizationPermissinProductComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    SharedModule
  ],
  exports: [
    OrganizationPermissinProductComponent
  ],
  entryComponents: [
    ProductSelectDialogComponent
  ]
})
export class MorejeeAuxModule { }
