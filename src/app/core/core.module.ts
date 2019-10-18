import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService } from './services/app-config.service';
import { AuthGuardService } from './services/auth-guard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AppConfigService,
    AuthGuardService
  ]
})
export class CoreModule { }
