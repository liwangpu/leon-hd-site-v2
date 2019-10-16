import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatTreeModule } from '@angular/material/tree';
import {CdkTreeModule} from '@angular/cdk/tree';
import { TutorialRoutingModule } from './tutorial-routing.module';
import { HomeComponent } from './components/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '@app/shared';
import { UserComponent } from './components/user/user.component';
@NgModule({
  declarations: [HomeComponent, UserComponent],
  imports: [
    CommonModule,
    SharedModule,
    CdkTreeModule,
    MatIconModule,
    TutorialRoutingModule
  ]
})
export class TutorialModule { }
