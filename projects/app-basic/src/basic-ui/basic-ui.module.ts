import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicUiRoutingModule } from './basic-ui-routing.module';
import { LoginComponent } from './components/login/login.component';
import { BasicMsModule } from '../basic-ms/basic-ms.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    BasicUiRoutingModule,
    BasicMsModule
  ]
})
export class BasicUiModule { }
