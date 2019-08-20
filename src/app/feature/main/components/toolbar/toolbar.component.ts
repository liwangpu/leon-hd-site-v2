import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LauncherComponent } from '../launcher/launcher.component';
import { AppCacheService } from '@app/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/feature/basic-ms';

@Component({
  selector: 'main-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  accountName = "User";
  constructor(protected dialogSrv: MatDialog,protected cacheSrv: AppCacheService, protected router: Router,protected accountSrv: AccountService) {

  }//constructor

  ngOnInit() {
    this.accountSrv.getProfile().subscribe(profile => {
      this.accountName = profile.name;
    });
  }//ngOnInit

  openLauncher() {
    this.dialogSrv.open(LauncherComponent, { width: '900px', height: '750px' });
  }//openLauncher

  logout() {
    this.cacheSrv.tokenExpires = "";
    this.cacheSrv.token = "";
    this.cacheSrv.lastLoginAccount = JSON.stringify({
      username: '',
      password: ''
    });
    this.router.navigateByUrl("/public/login");
  }//logout

}
