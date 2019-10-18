import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicUiRoutingModule } from './basic-ui-routing.module';
import { LoginComponent } from './components/login/login.component';
import { BasicMsModule } from '../basic-ms/basic-ms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    BasicUiRoutingModule,
    BasicMsModule
  ]
})
export class BasicUiModule { }
