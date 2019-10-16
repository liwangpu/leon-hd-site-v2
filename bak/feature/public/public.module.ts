import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [LoginComponent, LoadingComponent],
  providers: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
