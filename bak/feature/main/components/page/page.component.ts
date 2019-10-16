import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppCacheService } from '@app/core';

@Component({
  selector: 'main-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(protected acr: ActivatedRoute, protected cacheSrv: AppCacheService, protected router: Router) {
    let profile = this.acr.snapshot.data['profile'];

    if (profile.error) {
      this.cacheSrv.clearToken();
      this.router.navigateByUrl('/public/login');
      return;
    }

    this.cacheSrv.accountId = profile.id;
  }//constructor

  ngOnInit() {

  }//ngOnInit

}
