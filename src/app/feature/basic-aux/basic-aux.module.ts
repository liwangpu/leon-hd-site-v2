import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationSelectDialogComponent } from './components/organization-select-dialog/organization-select-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [OrganizationSelectDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ],
  exports: [
    
  ],
  entryComponents: [
    OrganizationSelectDialogComponent
  ]
})
export class BasicAuxModule { }
