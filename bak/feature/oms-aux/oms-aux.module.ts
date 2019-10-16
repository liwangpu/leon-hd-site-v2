import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSelectDialogComponent } from './components/customer-select-dialog/customer-select-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [CustomerSelectDialogComponent],
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
    CustomerSelectDialogComponent
  ]
})
export class OmsAuxModule { }
