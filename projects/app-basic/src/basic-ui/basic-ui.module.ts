import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicUiRoutingModule } from './basic-ui-routing.module';
import { LoginComponent } from './components/login/login.component';
import { BasicMsModule } from '../basic-ms/basic-ms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { AppCommonModule } from 'app-common';


@NgModule({
  declarations: [LoginComponent, DashboardComponent, MainComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    AppCommonModule,
    BasicUiRoutingModule,
    BasicMsModule
  ]
})
export class BasicUiModule { }
