import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { TranslateModule } from '@ngx-translate/core';
//mat modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
//components
import { PageComponent } from './components/page/page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LauncherComponent } from './components/launcher/launcher.component';
import { AccountProfileResolverService } from './services/account-profile-resolver.service';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [PageComponent, ToolbarComponent, LauncherComponent, NavbarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MainRoutingModule
  ],
  providers: [
    AccountProfileResolverService
  ],
  entryComponents: [
    LauncherComponent
  ]
})
export class MainModule { }
