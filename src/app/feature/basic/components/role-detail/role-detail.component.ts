import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '@app/feature/basic-ms';

@Component({
  selector: 'basic-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  role: Role;
  constructor(protected acr: ActivatedRoute) {
    this.role = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Role();
  }//constructor

  ngOnInit() {

  }//ngOnInit

}
