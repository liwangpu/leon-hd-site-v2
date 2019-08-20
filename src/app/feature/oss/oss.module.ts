import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OssRoutingModule } from './oss-routing.module';
import { SharedModule } from '@app/shared';
//mat modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FileassetComponent } from './components/fileasset/fileasset.component';
import { FileassetDetailComponent } from './components/fileasset-detail/fileasset-detail.component';
import { FileassetResolverService } from './services/fileasset-resolver.service';
import { FileassetDetailBasicComponent } from './components/fileasset-detail-basic/fileasset-detail-basic.component';


@NgModule({
  declarations: [FileassetComponent, FileassetDetailComponent, FileassetDetailBasicComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    OssRoutingModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [
    FileassetResolverService
  ]
})
export class OssModule { }
