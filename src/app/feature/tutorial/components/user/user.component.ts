import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OpsatService } from '../../services/opsat.service';

@Component({
  selector: 'tutorial-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    OpsatService
  ]
})
export class UserComponent implements OnInit, OnDestroy {


  constructor(private opsat: OpsatService) {

  }//constructor

  ngOnInit() {
    console.log('user int');
  }//ngOnInit

  ngOnDestroy(): void {
    console.log('user destroy');
  }

}
