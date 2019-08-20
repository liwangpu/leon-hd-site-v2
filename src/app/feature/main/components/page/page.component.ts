import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCacheService } from '@app/core';

@Component({
  selector: 'main-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(protected acr: ActivatedRoute, protected cacheSrv: AppCacheService) {
    // this.account = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Account();
    let profile = this.acr.snapshot.data['profile'];
    this.cacheSrv.accountId = profile.id;
    console.log('profile', profile);
  }//constructor

  ngOnInit() {

  }//ngOnInit

}
